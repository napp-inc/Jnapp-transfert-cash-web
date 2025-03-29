import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const staticLocations = [
	{
		id: 'agence1',
		lat: -4.389892,
		lng: 15.313868,
		name: 'Agence Ngaba',
	},
];

// Déplacez la logique Socket.io ici
export default function RealtimeMap() {
	const [positions, setPositions] = useState([]);

	useEffect(() => {
		// Code client-only
		const socket = require('socket.io-client')('http://localhost:3001');

		socket.on('positions', (newPositions) => {
			setPositions(newPositions);
		});

		return () => socket.disconnect();
	}, []);

	return (
		<div className='bg-gray-100 p-4 w-[100%]'>
			<h2 className='text-black-2xl font-bold mb-4'>Carte</h2>
			<MapContainer
				center={[-4.389892, 15.313868]} // Coordonnées Kin Distribution RPNGABA [-4.389892, 15.313868]
				zoom={17}
				style={{ height: '70vh', width: '70vw' }}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />

				{/* Marqueurs dynamiques (positions des véhicules) */}
				{positions.map((pos) => (
					<Marker key={pos.id} position={[pos.lat, pos.lng]}>
						<Popup>{pos.name}</Popup>
					</Marker>
				))}

				{/* Marqueurs statiques (agences) */}
				{staticLocations.map((location) => (
					<Marker
						key={location.id}
						position={[location.lat, location.lng]}
						icon={L.icon({
							iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
							iconSize: [25, 41],
							iconAnchor: [12, 41],
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
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
