'use client';

import AddOrganisation from '../../../components/organisms/AddOrganisationForm';
import Menu from '../../../components/organisms/MenuDashbord';
//import ProtectedRoute from '../../components/ProtectedRoute';
//import { AuthProvider } from '../../contexts/AuthContext';

export default function Home() {
    return (
        <div className="flex flex-col sm:flex-row gap-0 bg-gray-100 h-200">
            <Menu />
            <AddOrganisation />
        </div>

    );
}
