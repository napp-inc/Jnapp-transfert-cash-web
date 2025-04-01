'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { backendLogin } from '../endPointsAndKeys';
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();
	const { isAuthenticated, login, logout } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Appel à notre backend au lieu de Firebase
			const response = await fetch(`${backendLogin}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) throw new Error('Identifiants invalides');

			console.log(response.json());

			const { token } = await response.json();
			localStorage.setItem('authToken', token); // Stockage du token JWT
			console.log(token);
			router.push('/dashboard');
		} catch (error) {
			console.error('Erreur de connexion:', error);
			alert('Connexion échouée : ' + error.message);
		}
	};

	return (
		<div className="bg-white flex justify-center items-center h-screen sm:bg-gray-100">
			<div className="bg-white p-8 rounded-lg sm:shadow-md w-full max-w-md">
				<h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
				<img src="/appLogo/J-napps-tracker-logo.png" alt="Logo Kin Distribution" className="w-24 h-24 mx-auto mb-6 rounded-full" />
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Mot de passe"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
					/>
					<a href="#" className="text-yellow-500 text-center block">
						Mot de passe oublié ?
					</a>
					<button type="submit" className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300">
						Se connecter
					</button>
				</form>
			</div>
		</div>
	);
}
