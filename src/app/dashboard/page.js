'use client'; // Obligatoire ici

import DashboardContent from '../../components/DashboardContent';
//import DashboardMenu from '../../components/DashboardMenu';
//import RealtimeMap from '../../components/RealTimeMap';
import Menu from '../../components/DashboardMenu';
import ProtectedRoute from '../../components/ProtectedRoute';
import { AuthProvider } from '../../contexts/AuthContext';

export default function Home() {
	return (
		<AuthProvider>
			<ProtectedRoute>
				<div className="flex flex-col sm:flex-row gap-0 ">
					<Menu />
					<DashboardContent />
				</div>
			</ProtectedRoute>
		</AuthProvider>
	);
}
