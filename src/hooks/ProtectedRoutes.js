'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            console.log('Accès non autorisé - Redirection vers la connection');
            router.push('/');
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    return isAuthenticated ? children : null;
}
