'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';

import LoginFormFields from '../molecules/LoginFormFields';
import Logo from '../atoms/Logo';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            localStorage.setItem('idToken', idToken);
            router.push('/dashboard');

        } catch (error) {
            console.error('Erreur:', error);
            alert('Connexion échouée');
            router.push('/');
        }
    };

    return (
        <div className="bg-white flex justify-center items-center h-screen sm:bg-gray-100">
            <div className="bg-white p-8 rounded-lg sm:shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
                <Logo src="/appLogo/J-napps-tracker-logo.png" alt="Logo Kin Distribution" size="w-24 h-24  mx-auto mb-6 " />
                <LoginFormFields email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmit={handleSubmit} />
            </div>
        </div>
    );

}
