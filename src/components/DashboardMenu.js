'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import useMediaQuery from '../hooks/UseMediaQuery';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const MenuItem = ({ src, alt, href, label, isActive }) => {
	return (
		<div className="flex items-center space-x-2 py-2 hover:bg-gray-100 transition duration-300">
			<Image src={src} alt={alt} width={24} height={24} className="w-6 h-6" loading="lazy" />
			<Link href={href} passHref>
				<span className={`text-lg ${isActive ? 'text-yellow-500 font-bold' : 'text-gray-700'}`}>{label}</span>
			</Link>
		</div>
	);
};

export default function Menu() {
	const router = useRouter();
	const { logout } = useAuth();
	const [isHidden, setIsHidden] = useState(false);
	const isMobile = useMediaQuery('(max-width: 767px)');

	const toggleVisibility = () => {
		if (isMobile) setIsHidden((prev) => !prev);
	};

	const handleLogout = async () => {
		try {
			await logout();
			router.push('/');
			console.log('Déconnexion réussie');
		} catch (error) {
			console.error('Erreur lors de la déconnexion:', error);
		}
	};

	return (
		<div className="bg-white p-4 rounded shadow-md w-5/5 sm:w-1/5">
			<div className="flex items-center space-x-2 mb-4">
				<Image src={'https://i.ibb.co/1ts0fBm9/Frame-36.png'} alt={'Logo Kin Distribution'} width={32} height={32} className="w-8 h-8 rounded-full" />
				<h1 onClick={toggleVisibility} className="text-xl font-bold">
					J-napps Tracker
				</h1>
			</div>

			<hr className="my-2 border-gray-300" />

			<div
				className={`${isHidden && isMobile ? 'hidden' : ''} 
          md:block`}
			>
				<MenuItem src="/dashboardIconeActive.svg" alt="Tableau de bord" href="/dashboard" label="Tableau de bord" isActive />
				<MenuItem src="/vehicleIconeInactive.svg" alt="Véhicules" href="#" label="Véhicules" />
				<MenuItem src="/transfertIconeInactive.svg" alt="Transferts" href="#" label="Transferts" />
				<MenuItem src="/alertsIconeInactive.svg" alt="Alertes" href="#" label="Alertes" />
				<MenuItem src="/reportsIconeInactive.svg" alt="Rapports" href="#" label="Rapports" />
			</div>

			<hr
				className={`${isHidden && isMobile ? 'hidden' : ''} 
          md:block my-4 border-gray-300`}
			/>

			<div
				className={`${isHidden && isMobile ? 'hidden' : ''} 
          md:block`}
			>
				<MenuItem src="/accountIconeInactive.svg" alt="Compte" href="#" label="Compte" />
				<MenuItem src="/settingsIconeInactive.svg" alt="Paramètres" href="#" label="Paramètres" />

				<button onClick={handleLogout} className="w-full mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300">
					Déconnexion
				</button>
			</div>
		</div>
	);
}
