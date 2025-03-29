import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Hook personnalisé pour données statiques avec cache
const useCachedLocations = (apiUrl) => {
	const [locations, setLocations] = useState([]);

	useEffect(() => {
		// 1. Charger depuis le cache local
		const cached = localStorage.getItem('cachedLocations');
		if (cached) setLocations(JSON.parse(cached));

		// 2. Connexion WebSocket pour mises à jour
		const socket = require('socket.io-client')(apiUrl);

		// 3. Écouter les mises à jour du backend
		socket.on('update-static', (newData) => {
			setLocations(newData);
			localStorage.setItem('cachedLocations', JSON.stringify(newData));
		});

		// 4. Requête initiale si pas de cache
		if (!cached) {
			fetch(`${apiUrl}/static-locations`)
				.then((response) => response.json())
				.then((data) => {
					setLocations(data);
					localStorage.setItem('cachedLocations', JSON.stringify(data));
				});
		}

		return () => socket.disconnect();
	}, [apiUrl]);

	return locations;
};

// Fonction pour icônes dynamiques
const getDynamicIcon = (alertLevel) => {
	const colors = {
		0: 'green',
		1: 'orange',
		2: 'red',
	};

	return L.icon({
		iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${colors[alertLevel]}.png`,
		iconSize: [25, 41],
		iconAnchor: [12, 41],
	});
};

export default function RealtimeMap() {
	const apiUrl = 'http://localhost:3001';
	const staticLocations = useCachedLocations(apiUrl);
	const [movingObjects, setMovingObjects] = useState([]);

	// Gestion des objets en mouvement
	useEffect(() => {
		const socket = require('socket.io-client')(apiUrl);

		socket.on('moving-objects', (newData) => {
			setMovingObjects(newData);
		});

		return () => socket.disconnect();
	}, [apiUrl]);

	return (
		<div className="bg-gray-100 p-4 w-full">
			<h2 className="text-xl font-bold mb-4">Carte</h2>
			<MapContainer center={[-4.389892, 15.313868]} zoom={17} style={{ height: '70vh', width: '70vw' }}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />

				{/* Marqueurs statiques avec cache */}
				{staticLocations.map((location) => (
					<Marker
						key={location.id}
						position={[location.lat, location.lng]}
						icon={L.icon({
							iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
							iconSize: [25, 41],
						})}
					>
						<Popup>
							<div className="p-2">
								<h3 className="font-bold">{location.name}</h3>
								<p>{location.address}</p>
								<button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={() => alert(`Navigation vers ${location.name}`)}>
									Itinéraire
								</button>
							</div>
						</Popup>
						<Tooltip direction="top" className="bg-white text-black p-1 rounded">
							{location.name}
						</Tooltip>
					</Marker>
				))}

				{/* Objets en mouvement avec alertes */}
				{movingObjects.map((obj) => (
					<Marker key={obj.id} position={[obj.lat, obj.lng]} icon={getDynamicIcon(obj.alertLevel)}>
						<Popup>
							<div className="p-2">
								<h3>{obj.name}</h3>
								<p>Vitesse : {obj.speed} km/h</p>
								<p>Dernière mise à jour : {new Date(obj.timestamp).toLocaleTimeString()}</p>
							</div>
						</Popup>
						<Tooltip direction="right" className="bg-white text-black p-1 rounded">
							<div>Niveau alerte : {obj.alertLevel}</div>
							<div>Statut : {obj.status}</div>
						</Tooltip>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
