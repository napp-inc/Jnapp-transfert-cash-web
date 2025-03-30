'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import useSWR from 'swr';
import io from 'socket.io-client';
import { apiBackendRoute } from '../firebase';
import { apiKeyGoogleMaps } from '../firebase';

// Données statiques par défaut
const defaultStatic = [
	{ id: 1, name: 'AGENCE NGABA', lat: -4.389857, lng: 15.313761 },
	// ... autres agences
];

// Données mobiles par défaut
const defaultMobile = [
	{
		id: 1,
		name: 'Unité régulière',
		position: { lat: -4.389857, lng: 15.313761 },
		path: [
			{ lat: -4.389857, lng: 15.313761 },
			{ lat: -4.407689, lng: 15.256341 },
		],
		speed: 30,
		lastMove: Date.now(),
	},
	// ... autres unités
];

// Hook pour agences fixes
const useAgencies = () => {
	const { data, error } = useSWR(
		'/agencies',
		() =>
			fetch('/agencies').then((res) => {
				if (!res.ok) throw new Error('API error');
				return res.json();
			}),
		{ revalidateOnFocus: false }
	);
	return error ? defaultStatic : data || defaultStatic;
};

// Hook pour unités mobiles
const useMobileUnits = (isLoaded) => {
	const [mobileUnits, setMobileUnits] = useState(defaultMobile);
	const [alerts, setAlerts] = useState({});
	const [isConnected, setIsConnected] = useState(true);
	const [directions, setDirections] = useState({});
	const [etas, setEtas] = useState({});

	// Mise à jour des positions [[1]]
	useEffect(() => {
		const interval = setInterval(() => {
			setMobileUnits((prev) =>
				prev.map((unit) => ({
					...unit,
					position: unit.speed > 0 ? getNextPosition(unit) : unit.position,
					lastMove: Date.now(),
				}))
			);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	// Gestion socket.io [[5]]
	useEffect(() => {
		if (!isLoaded) return;

		const socket = io(apiBackendRoute, {
			reconnectionAttempts: 3,
			timeout: 5000,
		});

		socket.on('connect', () => {
			setIsConnected(true);
			socket.emit('get-mobile-units');
		});

		socket.on('mobile-data', setDataWithValidation);
		socket.on('disconnect', handleDisconnect);

		return () => {
			socket.off('mobile-data', setDataWithValidation);
			socket.disconnect();
		};
	}, [isLoaded]);

	// Validation des données reçues
	const setDataWithValidation = (data) => {
		if (Array.isArray(data)) setMobileUnits(data);
		else console.error('Invalid mobile data format');
	};

	// Déconnexion
	const handleDisconnect = () => {
		setIsConnected(false);
		setMobileUnits(defaultMobile);
	};

	// Calcul de position [[5]]
	const getNextPosition = (unit) => {
		const currentIndex = unit.path.findIndex((p) => p.lat === unit.position.lat && p.lng === unit.position.lng);
		return unit.path[(currentIndex + 1) % unit.path.length];
	};

	// Gestion des itinéraires [[5]]
	useEffect(() => {
		if (!isLoaded || !isConnected || !google?.maps?.DirectionsService) return;

		const fetchRoute = async (unit) => {
			try {
				const directionsService = new google.maps.DirectionsService();
				const result = await directionsService.route({
					origin: unit.path[0],
					destination: unit.path[unit.path.length - 1],
					travelMode: 'DRIVING',
				});
				setDirections((prev) => ({ ...prev, [unit.id]: result }));
				setEtas((prev) => ({
					...prev,
					[unit.id]: result.routes[0].legs[0].duration.value,
				}));
			} catch (error) {
				console.error('Directions API error:', error);
			}
		};

		mobileUnits.forEach(fetchRoute);
	}, [mobileUnits, isConnected, isLoaded]);

	// Gestion des alertes [[1]]
	useEffect(() => {
		if (!isConnected) return;

		const newAlerts = {};
		mobileUnits.forEach((unit) => {
			if (unit.speed < 5 && Date.now() - unit.lastMove > 300000) {
				newAlerts[unit.id] = `ALERTE : ${unit.name} immobilisé`;
			}
		});
		setAlerts(newAlerts);
	}, [mobileUnits, isConnected]);

	return { mobileUnits, alerts, directions, etas };
};

// Composant principal
export default function RealTimeMap() {
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: apiKeyGoogleMaps,
		libraries: ['places', 'directions'],
	});

	useEffect(() => {
		if (loadError) console.error('Google Maps Error:', loadError);
	}, [loadError]);

	const defaultCenter = { lat: -4.389892, lng: 15.313868 };
	const agencies = useAgencies();
	const { mobileUnits, alerts, directions, etas } = useMobileUnits(isLoaded);

	if (loadError) return <div>Erreur de chargement de la carte</div>;
	if (!isLoaded) return <div>Chargement...</div>;

	return (
		<div className="bg-gray-100 p-4 w-full">
			<h2 className="text-xl font-bold mb-4">Carte</h2>

			<GoogleMap
				mapContainerStyle={{ height: '70vh', width: '70vw' }}
				center={defaultCenter}
				zoom={12}
				options={{
					mapTypeControl: false,
					streetViewControl: false,
					rotateControl: true,
					fullscreenControl: false,
				}}
			>
				{/* Agences fixes avec clés uniques */}
				{agencies.map((agency) => (
					<Marker
						key={agency.id}
						position={{ lat: agency.lat, lng: agency.lng }}
						icon={{
							url: '/blue-marker.png',
							scaledSize: new google.maps.Size(30, 30),
						}}
					/>
				))}

				{/* Unités mobiles avec gestion d'erreurs [[5]] */}
				{mobileUnits.map((unit) => (
					<React.Fragment key={unit.id}>
						{directions[unit.id] && <DirectionsRenderer directions={directions[unit.id]} options={{ polylineOptions: { strokeColor: '#FFA500', strokeWeight: 4 } }} />}
						<Marker
							key={`${unit.id}-${unit.position.lat}-${unit.position.lng}`}
							position={unit.position}
							icon={{
								url: alerts[unit.id] ? '/red-marker.png' : '/yellow-marker.png',
								scaledSize: new google.maps.Size(30, 30),
							}}
							label={{
								text: `${Math.round(etas[unit.id] / 60)} min`,
								className: 'eta-label',
							}}
						/>
					</React.Fragment>
				))}
			</GoogleMap>
		</div>
	);
}
