'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';

import LoginFormFields from '../molecules/LoginFormFields';
import Logo from '../atoms/Logo';
import Popup from '../atoms/Popup';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [popupMessage, setPopupMessage] = useState(null); // État pour le popup
    const [loading, setLoading] = useState(false); // État pour gérer le chargement
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPopupMessage(null); // Réinitialiser le popup

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            localStorage.setItem('idToken', idToken);
            setPopupMessage("Bienvenue dans J-napps !");
            setTimeout(() => {
                router.push('/dashboard'); // Rediriger après 2 secondes
            }, 2000);
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            setPopupMessage("Échec de la connexion. Veuillez vérifier vos identifiants.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white flex justify-center items-center h-screen sm:bg-gray-100">
            <div className="bg-white p-8 rounded-lg sm:shadow-md w-full max-w-md relative">
                <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
                <Logo src="/appLogo/J-napps-tracker-logo.png" alt="Logo Kin Distribution" size="w-24 h-24 mx-auto mb-6" />
                <LoginFormFields
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    onSubmit={handleSubmit}
                />

                <Popup
                    message={popupMessage}
                    onClose={() => setPopupMessage(null)}
                />
            </div>
        </div>
    );
}