'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const [agence, setAgence] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        //authentification
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md pt-[50px] pb-[50px]">
                <h1 className="text-2xl font-bold text-center mb-6">Créer un compte</h1>
                <img
                    src="https://i.ibb.co/1ts0fBm9/Frame-36.png"
                    alt="Logo Kin Distribution"
                    className="w-24 h-24 mx-auto mb-6 rounded-full"
                />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={agence}
                        onChange={(e) => setAgence(e.target.value)}
                        placeholder="Agence"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
                    />
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nom complet (Nom Postnom Prénom)"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
                    />
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Numéro de téléphone"
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
                    <input
                        type="password"
                        value={secondPassword}
                        onChange={(e) => setSecondPassword(e.target.value)}
                        placeholder="Confirmer le mot de passe"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
                    />
                    <p className="text-sm mt-4">
                        En créant un compte, vous acceptez nos <a href="#" className="text-yellow-500 hover:text-yellow-600">conditions d'utilisation</a> et <a href="#" className="text-yellow-500 hover:text-yellow-600">politiques de confidentialité</a>
                    </p>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                    >
                        S'inscrire
                    </button>
                </form>
                <p className="text-center mt-4">
                    Vous avez déjà un compte ? <a href="#" className="text-yellow-500">Se connecter</a>
                </p>
            </div>
        </div>
    );
}
