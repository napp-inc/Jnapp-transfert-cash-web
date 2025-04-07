'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../contexts/authContext';

export default function ProtectedRoute({ children }) {
	const { currentUser, loading, checkAuthStatus } = useAuth();
	const router = useRouter();

	useEffect(() => {
		// Vérifie l'état d'authentification au montage
		checkAuthStatus();

		// Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
		if (!loading && !currentUser) {
			console.log("Accès non autorisé - Redirection vers la page de connexion");
			router.push('/');
		}
	}, [currentUser, loading, router, checkAuthStatus]);

	// Pendant le chargement, affiche un indicateur de chargement
	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				Chargement...
			</div>
		);
	}

	return currentUser ? children : null;
}