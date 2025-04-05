"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
//import { useAuth } from '../contexts/AuthContext';
import Heading from '../atoms/Heading';
import Logo from '../atoms/Logo'
import Button from '../atoms/Button';

export default function LandingPage() {
    const router = useRouter();
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-between p-4">
            {/* Header */}
            <header className="w-full max-w-md mt-8 mb-16">
            <Logo src="/appLogo/J-napps-tracker-logo.png" alt="Logo Kin Distribution" size="w-40 h-40  mx-auto mb-6 " />
                <Heading level="h1" children="J-napps Tracker" className="px-4 mt-4 text-xl font-bold text-center text-orange-600" />
                <p className="text-lg text-center mt-4">
                    Pour suivre vos transferts de cash en temps réel
                </p>
            </header>

            {/* Sections principales */}
            <main className="flex-grow w-full max-w-md px-4">
                {/* Carrousel ou vidéo promotionnelle */}
                {/* ... */}

                {/* Boutons d'action */}
                <div className="mt-8 space-y-4">
                    <Button text="Se connecter" onClick={() => router.push('/login')} />
                    <Button text="S'inscrire" onClick={() => router.push('/register')} />
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-8 text-sm text-center text-gray-500">
                © 2025 J-napps Tracker |
                <a href="#" className="text-orange-500 hover:underline">
                    Conditions d'utilisation
                </a> |
                <a href="#" className="text-orange-500 hover:underline">
                    Politique de confidentialité
                </a>
            </footer>
        </div>
    );
}
