'use client';

import Link from 'next/link';
//import { useRouter } from 'next/router';

const MenuItem = ({ src, alt, href, label, isActive }) => {
	return (
		<div className="flex items-center space-x-2 py-2 hover:bg-gray-100 transition duration-300">
			<img src={src} alt={alt} className="w-6 h-6" />
			<Link href={href} passHref>
				<span className={`text-lg ${isActive ? 'text-yellow-500 font-bold' : 'text-gray-700'}`}>{label}</span>
			</Link>
		</div>
	);
};

export default function Menu() {
	const handleLogout = () => {
		// Logic to handle logout
		console.log('Déconnexion');
	};

	return (
		<div className="bg-white p-4 rounded shadow-md w-1/5">
			{/* Logo */}
			<div className="flex items-center space-x-2 mb-4">
				<img src="https://i.ibb.co/1ts0fBm9/Frame-36.png" alt="Logo Kin Distribution" className="w-8 h-8 rounded-full" />
				<h1 className="text-xl font-bold">J-napps Tracker</h1>
			</div>

			{/* Ligne de séparation */}
			<hr className="my-2 border-gray-300" />

			{/* Première section du menu */}
			<div>
				<MenuItem src="/dashboardIconeActive.svg" alt="Tableau de bord" href="/dashboard" label="Tableau de bord" isActive />
				<MenuItem src="/vehicleIconeInactive.svg" alt="Véhicules" href="#" label="Véhicules" />
				<MenuItem src="/transfertIconeInactive.svg" alt="Transferts" href="#" label="Transferts" />
				<MenuItem src="/alertsIconeInactive.svg" alt="Alertes" href="#" label="Alertes" />
				<MenuItem src="/reportsIconeInactive.svg" alt="Rapports" href="#" label="Rapports" />
			</div>

			{/* Ligne de séparation */}
			<hr className="my-4 border-gray-300" />

			{/* Deuxième section du menu */}
			<div>
				<MenuItem src="/accountIconeInactive.svg" alt="Compte" href="#" label="Compte" />
				<MenuItem src="/settingsIconeInactive.svg" alt="Paramètres" href="#" label="Paramètres" />

				{/* Bouton de déconnexion */}
				<button onClick={handleLogout} className="w-full mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300">
					Déconnexion
				</button>
			</div>
		</div>
	);
}
