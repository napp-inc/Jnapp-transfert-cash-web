'use client';

import AddVehicle from '../../../components/organisms/AddVehicleForm';
import Menu from '../../../components/organisms/MenuDashbord';
import ProtectedRoute from '../../../contexts/protectedRoute';

export default function Home() {
    return (
        <ProtectedRoute>
            <div className="flex flex-col sm:flex-row gap-0 bg-gray-100">
                <Menu />
                <AddVehicle />
            </div>
        </ProtectedRoute>
    );
}
