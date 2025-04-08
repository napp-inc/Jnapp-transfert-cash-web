// Composant parent DashboardContent.jsx
'use client';
//import dynamic from 'next/dynamic';
import Preview from '../molecules/PreviewDashboard';
import TransfertsDashboard from '../molecules/TransfertsNow';
import AlertsList from '../molecules/AlertsList';
import MapComponent from '../molecules/RealTimeMap';



export default function ContentDashboard() {
    return (
        <div className="sm:w-4/5 w-5/5 bg-gray-100 py-10 justify-center items-center">
            <Preview />
            <MapComponent />
            <TransfertsDashboard />
            <AlertsList />
        </div>
    );
}
