'use client';

import AgenciesList from '../../../components/molecules/AgencyList';
import Menu from '../../../components/organisms/MenuDashbord';
import ProtectedRoute from '../../../contexts/protectedRoute';

export default function Home() {
    return (
        <ProtectedRoute>
            <div className="flex flex-col sm:flex-row gap-0 bg-gray-100 min-h-screen">
                <Menu />
                <AgenciesList />
            </div>
        </ProtectedRoute>
    );
}
