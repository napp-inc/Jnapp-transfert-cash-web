'use client';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Preview from './Preview';
import TransfertsNow from './TransferetsNow';
// import RealtimeMap from './RealTimeMap';
import NotificationsList from './AlertsNow';

const RealTimeMap = dynamic(
	() => import('./RealTimeMap'),
	{ ssr: false } // Désactive SSR pour ce composant
);

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
