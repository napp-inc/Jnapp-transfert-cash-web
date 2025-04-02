'use client'; // Obligatoire ici

import ContentDashboard from '../../../components/organisms/ContentDashboard';
import Menu from '../../../components/organisms/MenuDashbord';
//import ProtectedRoute from '../../components/ProtectedRoute';
//import { AuthProvider } from '../../contexts/AuthContext';

export default function Home() {
    return (
        <div className="flex flex-col sm:flex-row gap-0 bg-gray-100">
            <Menu />
            <ContentDashboard />
        </div>

    );
}
