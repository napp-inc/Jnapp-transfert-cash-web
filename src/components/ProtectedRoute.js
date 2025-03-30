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
			router.push('/'); // Utilisez votre route de connexion
		}
	}, [isAuthenticated, loading, router]);

	if (loading) {
		return <div>Loading...</div>; // Affichage temporaire pendant la vérification
	}

	return isAuthenticated ? children : null;
}
