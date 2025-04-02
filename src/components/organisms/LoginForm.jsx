'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { backendLogin } from '../../endPointsAndKeys';
import { useAuth } from '../../contexts/AuthContext';
import LoginFormFields from '../molecules/LoginFormFields';
import Logo from '../atoms/Logo';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { isAuthenticated, login, logout } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendLogin}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Identifiants invalides');
            const { token } = await response.json();
            localStorage.setItem('authToken', token);
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
                <Logo src="/appLogo/J-napps-tracker-logo.png" alt="Logo Kin Distribution" size="w-24 h-24" />
                <LoginFormFields email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}