'use client';

import AgentList from "../../../components/molecules/AgentsList";
import Menu from '../../../components/organisms/MenuDashbord';
import ProtectedRoute from '../../../contexts/protectedRoute';
import { AuthProvider } from '../../../contexts/authContext';

export default function Home() {
    return (
        <AuthProvider>
            <ProtectedRoute>
                <div className="flex flex-col sm:flex-row gap-0 bg-gray-100">
                    <Menu />
                    <AgentList />
                </div>
            </ProtectedRoute>
        </AuthProvider>
    );
}
