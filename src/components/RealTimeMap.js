// components/MapComponent.jsx
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
	{ id: 2, name: 'AGENCE UPN', lat: -4.407689, lng: 15.256341 },
	{ id: 3, name: 'RAWBANK CITE VERTE', lat: -4.441887, lng: 15.259098 },
	{ id: 4, name: 'RAWBANK UPC', lat: -4.335108, lng: 15.29656 },
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
	{
		id: 2,
		name: 'Unité irrégulière',
		position: { lat: -4.441887, lng: 15.259098 },
		path: [
			{ lat: -4.441887, lng: 15.259098 },
			{ lat: -4.335108, lng: 15.29656 },
		],
		speed: 0,
		lastMove: Date.now() - 600000,
	},
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

// Hook pour unités mobiles avec animation corrigée
const useMobileUnits = (isLoaded) => {
	const [mobileUnits, setMobileUnits] = useState(defaultMobile);
	const [alerts, setAlerts] = useState({});
	const [isConnected, setIsConnected] = useState(true);
	const [directions, setDirections] = useState({});
	const [etas, setEtas] = useState({});

	// Mise à jour continue des positions
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

	// Gestion socket.io
	useEffect(() => {
		if (!isLoaded) return;

		const socket = io(`${apiBackendRoute}`);
		socket.on('connect', () => {
			setIsConnected(true);
			socket.emit('get-mobile-units');
		});

		socket.on('mobile-data', (data) => {
			console.log('Données reçues:', data);
			setMobileUnits(data);
		});

		socket.on('disconnect', () => {
			setIsConnected(false);
			setMobileUnits(defaultMobile);
		});

		return () => socket.disconnect();
	}, [isLoaded]);

	// Calcul de position cyclique
	const getNextPosition = (unit) => {
		const currentIndex = unit.path.findIndex((p) => p.lat === unit.position.lat && p.lng === unit.position.lng);
		const nextIndex = (currentIndex + 1) % unit.path.length; // Boucle infinie
		return unit.path[nextIndex];
	};

	// Gestion des itinéraires
	useEffect(() => {
		if (!isLoaded || !isConnected) return;

		const fetchRoute = async (unit) => {
			try {
				if (!google?.maps?.DirectionsService) return;
				const directionsService = new google.maps.DirectionsService();
				const result = await directionsService.route({
					origin: new google.maps.LatLng(unit.path[0]),
					destination: new google.maps.LatLng(unit.path[unit.path.length - 1]),
					travelMode: 'DRIVING',
					drivingOptions: {
						departureTime: new Date(),
						trafficModel: 'bestguess',
					},
				});
				setDirections((prev) => ({ ...prev, [unit.id]: result }));
				setEtas((prev) => ({
					...prev,
					[unit.id]: result.routes[0].legs[0].duration_in_traffic.value,
				}));
			} catch (error) {
				console.error('Erreur Directions API:', error);
			}
		};

		mobileUnits.forEach((unit) => fetchRoute(unit));
	}, [mobileUnits, isConnected, isLoaded]);

	// Gestion des alertes
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

// Composant principal avec options de carte ajustées
export default function RealTimeMap() {
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: apiKeyGoogleMaps,
		libraries: ['places', 'directions'],
		loadingTimeout: 10000,
	});

	useEffect(() => {
		if (loadError) console.error('Erreur Google Maps:', loadError);
	}, [loadError]);

	const [filters, setFilters] = useState({
		showStops: true,
		showDelays: true,
	});

	const agencies = useAgencies();
	const { mobileUnits, alerts, directions, etas } = useMobileUnits(isLoaded);
	const defaultCenter = { lat: -4.389892, lng: 15.313868 };

	if (loadError) return <div>Erreur de chargement de la carte</div>;
	if (!isLoaded) return <div>Chargement...</div>;

	return (
		<div className="bg-gray-100 p-4 w-full">
			<h2 className="text-xl font-bold mb-4">Carte</h2>

			<GoogleMap
				mapContainerStyle={{ height: '80vh', width: '100%' }}
				center={defaultCenter}
				zoom={12}
				options={{
					mapTypeControl: false,
					streetViewControl: false,
					rotateControl: true,
					fullscreenControl: false,
				}}
			>
				{/* Agences fixes */}
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

				{/* Unités mobiles avec clé dynamique */}
				{mobileUnits
					.filter((unit) => !filters.showStops || !alerts[unit.id])
					.map((unit) => (
						<React.Fragment key={unit.id}>
							{directions[unit.id] && <DirectionsRenderer directions={directions[unit.id]} options={{ polylineOptions: { strokeColor: '#FFA500', strokeWeight: 4 } }} />}
							<Marker
								key={`${unit.id}-${unit.position.lat}-${unit.position.lng}`} // [[1]]
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
