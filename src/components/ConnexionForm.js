'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        //authentification
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
                <img
                    src="https://i.ibb.co/1ts0fBm9/Frame-36.png"
                    alt="Logo Kin Distribution"
                    className="w-24 h-24 mx-auto mb-6 rounded-full"
                />
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
                    <a href="#" className="text-yellow-500 text-center block">Mot de passe oublié ?</a>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                    >
                        Se connecter
                    </button>
                </form>
                <p className="text-center mt-4">
                    Vous n'avez pas de compte ?
                    <a href="#" className="text-yellow-500">Créer un compte</a>
                </p>
            </div>
        </div>
    );
}
