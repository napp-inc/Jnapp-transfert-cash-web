"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { BsLinkedin, BsTwitter } from 'react-icons/bs';
import Heading from '../atoms/Heading';
import Logo from '../atoms/Logo';
import Button from '../atoms/Button';
import Link from 'next/link';

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="bg-white text-black min-h-screen">
            {/* Hero Section */}
            <div className="flex flex-col align-middle justify-center px-6 pt-20 pb-24 text-center">
                <Logo src="/appLogo/J-napps-tracker-logo.png" alt="Logo Kin Distribution" size="w-40 h-40  mx-auto mb-6 " />
                <Heading
                    level="h1"
                    className="text-5xl font-bold text-black tracking-tight mb-6"
                >
                    J-napps Tracker
                </Heading>
                <p className="text-lg text-gray-700 max-w-xl mx-auto mb-10">
                    Une solution complète pour suivre vos transferts de fonds en temps réel entre agences, partenaires et véhicules
                </p>

                <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                    <Button
                        text="S'inscrire"
                        onClick={() => router.push('/register')}
                        className="bg-yellow-500 hover:bg-yellow-600 font-bold text-white px-10 py-4 rounded-full border border-orange-200 transition-all"
                    />
                    <Button
                        text="Se connecter"
                        onClick={() => router.push('/login')}
                        className="bg-gray-300 hover:bg-gray-400 font-bold text-black px-10 py-4 rounded-full border border-orange-200 transition-all"
                    />
                </div>
            </div>

            <footer className=" bg-gray-100 w-screen mx-auto px-6 py-16 text-sm text-center text-gray-600">
                <div className="flex flex-col items-center space-y-8">
                    <div className="flex space-x-6">
                        <Link href="#" className="hover:text-yellow-500 transition-colors font-bold">
                            Conditions d'utilisation
                        </Link>

                        <Link href="#" className="hover:text-yellow-500 transition-colors font-bold">
                            Politique de confidentialité
                        </Link>
                    </div>

                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-yellow-500 transition-colors">
                            <BsLinkedin className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-yellow-500 transition-colors">
                            <BsTwitter className="w-6 h-6" />
                        </a>
                    </div>

                    <div>
                        © 2025 Kin Distribution. Tous droits réservés.
                    </div>
                </div>
            </footer>
        </div>
    );
}