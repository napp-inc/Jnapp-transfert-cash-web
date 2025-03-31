'use client';
import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import useSWR from 'swr';
import io from 'socket.io-client';
import { apiBackendRoute } from '../firebase';
import { apiKeyGoogleMaps } from '../firebase';
import { backendAgencies } from '../firebase';
// import GetAgencies from '../hooks/Agencies';

const useAgencies = () => {
	// Valeur par défaut statique en cas d'erreur ou de données manquantes
	const defaultStatic = [{ id: 1, name: 'AGENCE PAR DÉFAUT', lat: 0, lng: 0 }];

	// SWR pour récupérer les données
	const { data, error } = useSWR(
		backendAgencies,
		() =>
			fetch(backendAgencies).then((res) => {
				if (!res.ok) throw new Error('API error');
				return res.json();
			}),
		{ revalidateOnFocus: false } // Désactiver la revalidation lors du focus
	);

	// Transformation des données si elles existent
	const transformedData = data?.agences?.map((agence, index) => ({
		id: index + 1, // ID séquentiel
		name: agence.name,
		lat: agence.latitude,
		lng: agence.longitude,
	}));

	return error ? defaultStatic : transformedData || defaultStatic;
};

const useMobileUnits = (isLoaded) => {
	const [mobileUnits, setMobileUnits] = useState([]);
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

		socket.on('mobile-data', (data) => {
			// Mettre à jour les vehicules avec les nouvelles données
			setMobileUnits(data);
			// Mettre à jour les alertes
			const newAlerts = {};
			data.forEach((unit) => {
				if (unit.speed < 5 && Date.now() - unit.lastMove > 300000) {
					newAlerts[unit.id] = `ALERTE : ${unit.name} immobilisé`;
				}
			});
			setAlerts(newAlerts);
		});

		socket.on('disconnect', () => {
			setIsConnected(false);
			// Réinitialiser les vehicules en cas de déconnexion
			setMobileUnits([]);
		});

		return () => {
			socket.disconnect();
		};
	}, [isLoaded]);

	useEffect(() => {
		if (!isLoaded || !isConnected) return;

		const fetchRoute = async (unit) => {
			try {
				if (!window.google?.maps?.DirectionsService) {
					return;
				}

				const directionsService = new window.google.maps.DirectionsService();
				const result = await directionsService.route({
					origin: new window.google.maps.LatLng(unit.path[0].lat, unit.path[0].lng),
					destination: new window.google.maps.LatLng(unit.path[unit.path.length - 1].lat, unit.path[unit.path.length - 1].lng),
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

	return { mobileUnits, alerts, directions, etas };
};

export default function MapComponent() {
	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: apiKeyGoogleMaps,
		libraries: ['places'],
		authReferrerPolicy: 'origin',
		loadingTimeout: 15000,
	});

	useEffect(() => {
		if (loadError) {
			console.error('Erreur de chargement Google Maps:', loadError);
		}
	}, [loadError]);

	const [filters, setFilters] = useState({
		showStops: true,
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
		return <div>Chargement...</div>;
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
							scaledSize: new window.google.maps.Size(30, 30),
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
									scaledSize: new window.google.maps.Size(30, 30),
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
