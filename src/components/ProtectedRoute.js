'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
	const { currentUser, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !currentUser) {
			console.alert
			router.push('/');
		}
	}, [currentUser, loading, router]);

	return currentUser ? children : null;
}