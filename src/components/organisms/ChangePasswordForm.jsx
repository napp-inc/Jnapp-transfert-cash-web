'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

import ChangePasswordFormField from '../molecules/ChangePasswordFormFields';
import Logo from '../atoms/Logo';
import Popup from '../atoms/Popup';

export default function ChangePasswordForm() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [popupMessage, setPopupMessage] = useState(null); // État pour le popup
    const [loading, setLoading] = useState(false); // État pour gérer le chargement
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, oldPassword);
            await reauthenticateWithCredential(user, credential);

            await updatePassword(user, newPassword);

            setPopupMessage("Vous avez modifié votre mot de passe avec succès.");
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
        } catch (error) {
            console.error("Erreur lors de la modification:", error);
            setPopupMessage("Échec de la modification. Veuillez réessayer !");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white flex justify-center items-center h-screen sm:bg-gray-100">
            <div className="bg-white p-8 rounded-lg sm:shadow-md w-full max-w-md relative">
                <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
                <Logo src="/appLogo/J-napps-tracker-logo.png" alt="Logo Kin Distribution" size="w-24 h-24 mx-auto mb-6" />
                <ChangePasswordFormField
                    oldPassword={oldPassword}
                    setOldPassword={setOldPassword}
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
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