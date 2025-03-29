'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Preview from './Preview';
import TransfertsNow from './TransferetsNow';
import RealtimeMap from './RealTimeMap';
import NotificationsList from './AlertsNow';

export default function DashboardContent() {
    return (
        <div className="w-4/5 bg-gray-100 py-10 pl-10">
            <Preview />
            <RealtimeMap />
            <TransfertsNow />
            <NotificationsList />
        </div>
    );
}
