'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Preview from './Preview';
import TransfertsNow from './TransferetsNow';
import RealtimeMap from './RealTimeMap';

export default function DashboardContent() {
    return (
        <div className="w-4/5">
            <Preview />
            <RealtimeMap />
            <TransfertsNow />
        </div>
    );
}
