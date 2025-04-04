'use client';
import Image from 'next/image';
import { Alerts } from '../hooks/Alerts';

const ALERT_TYPES = {
	warning: {
		icon: '/alertIcones/warning.svg',
		color: 'text-red-600',
		backgroundColor: 'bg-red-100',
	},
	maintenance: {
		icon: '/alertIcones/maintenance.svg',
		color: 'text-blue-500',
		backgroundColor: 'bg-blue-100',
	},
};

const NotificationItem = ({ type, title, subtitle, timestamp }) => {
	const config = ALERT_TYPES[type] || ALERT_TYPES.warning;

	return (
		<div className={`flex items-center p-4 mb-4 rounded-lg items-center ${config.backgroundColor}`}>
			<div className="mr-4">
				<Image src={config.icon} alt={`${type} icon`} width={48} height={48} className="rounded-full" priority />
			</div>
			<div className="flex-grow">
				<h3 className={`text-lg font-bold ${config.color}`}>{title}</h3>
				<p className="text-gray-700">{subtitle}</p>
			</div>
			<div className={`text-right text-sm ${config.color}`}>{timestamp}</div>
		</div>
	);
};

export default function NotificationsList() {
	const { alerts, isLoading, isError } = Alerts();

	// if (isLoading)
	// 	return (
	// 		<div className="bg-gray-100 p-4 w-[100%]">
	// 			<h2 className="text-black-xl font-bold mb-4 title-size">Alertes</h2>
	// 			<p className="px-4 py-8 text-center">Chargement ...</p>
	// 		</div>
	// 	);
	if (isError)
		return (
			<div className="bg-gray-100 p-4 w-[100%] items-center">
				<h2 className="text-black-xl font-bold mb-4 title-size">Alertes</h2>
				<p className="px-4 py-8 text-center">Problèmes de connexion au serveur</p>
			</div>
		);

	return (
		<div className="bg-gray-100 p-4 w-[100%] items-center">
			<h2 className="text-black-xl font-bold mb-4 title-size">Alertes</h2>
			<div className="container mx-auto p-4">
				{alerts.length === 0 ? (
					<div className="text-center text-gray-500 py-4">Aucune alerte</div>
				) : (
					alerts.map((alert, index) => <NotificationItem key={index} type={alert.type} title={alert.title} subtitle={alert.subtitle} timestamp={alert.timestamp} />)
				)}
			</div>
		</div>
	);
}
