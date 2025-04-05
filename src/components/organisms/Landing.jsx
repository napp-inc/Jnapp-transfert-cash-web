"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { BsShieldLock, BsGeoAlt, BsBarChart, BsLinkedin, BsTwitter } from 'react-icons/bs';
import Heading from '../atoms/Heading';
import Logo from '../atoms/Logo';
import Button from '../atoms/Button';

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="bg-white text-black min-h-screen">
            {/* Hero Section */}
            <header className="flex flex-col align-middle justify-center px-6 pt-20 pb-24 text-center">
                <Logo src="/appLogo/J-napps-tracker-logo.png" alt="Logo Kin Distribution" size="w-40 h-40  mx-auto mb-6 " />
                <Heading
                    level="h1"
                    className="text-5xl font-bold text-orange-500 tracking-tight mb-6"
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
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-4 rounded-full border border-orange-200 transition-all"
                    />
                    <Button
                        text="Se connecter"
                        onClick={() => router.push('/login')}
                        className="bg-gray-300 hover:bg-gray-400 text-orange-500 px-10 py-4 rounded-full border border-orange-200 transition-all"
                    />
                </div>
            </header>

            {/* Features Section 
            
            <section className="max-w-6xl mx-auto px-6 py-20 bg-white rounded-3xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
                            <BsShieldLock className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">
                            Sécurité Maximale
                        </h3>
                        <p className="text-gray-600">
                            Chiffrement AES-256 et authentification à deux facteurs
                        </p>
                    </div>
                    <div className="space-y-4 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
                            <BsGeoAlt className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">
                            Suivi en Temps Réel
                        </h3>
                        <p className="text-gray-600">
                            Localisation GPS précise et historique des transferts
                        </p>
                    </div>
                    <div className="space-y-4 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
                            <BsBarChart className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">
                            Rapports Détaillés
                        </h3>
                        <p className="text-gray-600">
                            Détails et historiques des transferts
                        </p>
                    </div>
                </div>
            </section>
            
            */}


            {/* Call to Action */}
            <section className="max-w-6xl mx-auto px-6 py-20 text-center bg-orange-50 rounded-3xl">
                <h2 className="text-4xl font-bold text-orange-600 mb-6">
                    Prêt à sécuriser vos transferts ?
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto mb-10">
                    Créez votre compte gratuitement et bénéficiez de 30 jours d'essai premium
                </p>
                <Button
                    text="Démarrer gratuitement →"
                    onClick={() => router.push('/register')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-12 py-5 rounded-full shadow transition-all font-medium"
                />
            </section>

            {/* Footer */}
            <footer className=" bg-gray-100 w-screen mx-auto px-6 py-16 text-sm text-center text-gray-600">
                <div className="flex flex-col items-center space-y-8">
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-orange-500 transition-colors">
                            Conditions d'utilisation
                        </a>
                        <a href="#" className="hover:text-orange-500 transition-colors">
                            Politique de confidentialité
                        </a>
                    </div>

                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                            <BsLinkedin className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
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