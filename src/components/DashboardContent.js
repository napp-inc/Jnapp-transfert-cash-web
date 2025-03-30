// Composant parent DashboardContent.jsx
'use client';
import dynamic from 'next/dynamic';
import Preview from './Preview';
import TransfertsNow from './TransferetsNow';
import NotificationsList from './AlertsNow';

const RealTimeMap = dynamic(() => import('./RealTimeMap'), {
	ssr: false,
	loading: () => <div>Chargement de la carte...</div>, // Ajoutez un état de chargement [[5]]
});

export default function DashboardContent() {
	return (
		<div className="sm:4/5 w-5/5 bg-gray-100 py-10 pl-10">
			<Preview />
			<RealTimeMap />
			<TransfertsNow />
			<NotificationsList />
		</div>
	);
}
