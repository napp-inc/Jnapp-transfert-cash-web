'use client'; // Obligatoire ici

import TransfertsList from '../../../components/molecules/TransfertsList';
import Menu from '../../../components/organisms/MenuDashbord';
import ProtectedRoute from '../../../contexts/protectedRoute';

export default function Home() {
    return (
        <ProtectedRoute>
            <div className="flex flex-col sm:flex-row gap-0 bg-gray-100">
                <Menu />
                <TransfertsList />
            </div>
        </ProtectedRoute>
    );
}
