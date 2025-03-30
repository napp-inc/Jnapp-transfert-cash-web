'use client';
import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import useSWR from 'swr';
import io from 'socket.io-client';
import { apiBackendRoute } from '../firebase';
import { apiKeyGoogleMaps } from '../firebase';

// Données statiques par défaut [[3]]
const defaultStatic = [
	{ id: 1, name: 'AGENCE NGABA', lat: -4.389857, lng: 15.313761 },
	{ id: 2, name: 'AGENCE UPN', lat: -4.407689, lng: 15.256341 },
	{ id: 3, name: 'RAWBANK CITE VERTE', lat: -4.441887, lng: 15.259098 },
	{ id: 4, name: 'RAWBANK UPC', lat: -4.335108, lng: 15.29656 },
];

// Données mobiles par défaut [[5]]
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
		lastMove: Date.now() - 600000, // Arrêt de 10min
	},
];

// Hook pour agences fixes [[7]]
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

// Hook pour unités mobiles avec gestion d'erreur [[1]][[5]]
const useMobileUnits = (isLoaded) => {
	const [mobileUnits, setMobileUnits] = useState(defaultMobile);
	const [alerts, setAlerts] = useState({});
	const [isConnected, setIsConnected] = useState(true);
	const [directions, setDirections] = useState({});
	const [etas, setEtas] = useState({});

	useEffect(() => {
		if (!isLoaded) return;

		const socket = io(`${apiBackendRoute}`);
		socket.on('connect', () => {
			setIsConnected(true);
			socket.emit('get-mobile-units');
		});

		socket.on('mobile-data', (data) => setMobileUnits(data));

		socket.on('disconnect', () => {
			setIsConnected(false);
			setMobileUnits(defaultMobile);
		});

		let interval;
		if (!isConnected) {
			interval = setInterval(() => {
				setMobileUnits((prev) =>
					prev.map((unit) => ({
						...unit,
						position: unit.speed > 0 ? getNextPosition(unit) : unit.position,
					}))
				);
			}, 5000);
		}

		return () => {
			socket.disconnect();
			clearInterval(interval);
		};
	}, [isLoaded, isConnected]);

	const getNextPosition = (unit) => {
		const currentIndex = unit.path.findIndex((p) => p.lat === unit.position.lat && p.lng === unit.position.lng);
		return unit.path[currentIndex + 1] || unit.path[0];
	};

	useEffect(() => {
		if (!isLoaded || !isConnected) return;

		const fetchRoute = async (unit) => {
			try {
				if (!google?.maps?.DirectionsService) {
					console.warn('API Google Maps non prête');
					return;
				}

				const directionsService = new google.maps.DirectionsService();
				const result = await directionsService.route({
					origin: new google.maps.LatLng(unit.path[0].lat, unit.path[0].lng),
					destination: new google.maps.LatLng(unit.path[unit.path.length - 1].lat, unit.path[unit.path.length - 1].lng),
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

// Composant principal avec gestion des erreurs
export default function MapComponent() {
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: apiKeyGoogleMaps,
		libraries: ['places'],
		authReferrerPolicy: 'origin', // Correction pour iOS
		loadingTimeout: 15000, // Augmentation du délai
	});

	useEffect(() => {
		if (loadError) {
			console.error('Erreur de chargement Google Maps:', loadError);
		}
	}, [loadError]);

	const [filters, setFilters] = useState({
		showStops: true,
		showDelays: true,
	});

	const agencies = useAgencies();
	const { mobileUnits, alerts, directions, etas } = useMobileUnits(isLoaded);
	const defaultCenter = { lat: -4.389892, lng: 15.313868 };

	if (loadError) {
		return (
			<div>
				<p>Erreur de chargement de la carte</p>
				<button onClick={() => window.location.reload()}>Réessayer</button>
			</div>
		);
	}

	if (!isLoaded) {
		return <div>Chargement de la carte...</div>;
	}

	return (
		<div className="bg-gray-100 p-4 w-[100%] items-center">
			<h2 className="text-black-xl font-bold mb-4 title-size">Carte</h2>
			<GoogleMap mapContainerStyle={{ height: '70vh', width: '70vw' }} center={defaultCenter} zoom={12}>
				{agencies.map((agency) => (
					<Marker
						key={agency.id}
						position={{ lat: agency.lat, lng: agency.lng }}
						icon={{
							url: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png',
							scaledSize: new google.maps.Size(30, 30),
						}}
					/>
				))}

				{mobileUnits
					.filter((unit) => {
						if (!filters.showStops && alerts[unit.id]) return false;
						return true;
					})
					.map((unit) => (
						<React.Fragment key={unit.id}>
							{directions[unit.id] && (
								<DirectionsRenderer
									directions={directions[unit.id]}
									options={{
										polylineOptions: { strokeColor: '#FFA500', strokeWeight: 4 },
									}}
								/>
							)}
							<Marker
								position={unit.position}
								icon={{
									url: alerts[unit.id]
										? 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png'
										: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-yellow.png',
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
