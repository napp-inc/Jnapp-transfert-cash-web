'use client'; // Obligatoire ici

import TransfertsContent from '../../components/TransfertsContent';
//import DashboardMenu from '../../components/DashboardMenu';
//import RealtimeMap from '../../components/RealTimeMap';
import Menu from '../../components/DashboardMenu';
import ProtectedRoute from '../../components/ProtectedRoute';
import { AuthProvider } from '../../contexts/AuthContext';

export default function Home() {
    return (

        <div className="flex flex-col sm:flex-row gap-0 bg-gray-100">
            <Menu />
            <TransfertsContent />
        </div>

    );
}
