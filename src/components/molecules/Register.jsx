// pages/RegisterForm.js
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../../firebase';
import Heading from '../atoms/Heading';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Popup from '../atoms/Popup';
import axios from 'axios';
import { registerRoute } from '../../endPointsAndKeys';

export default function RegisterForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        code: '',
        designation: '',
        sigle: '',
        rccm: '',
        adresse: '',
        telephone: '',
        email: '',
        siteWeb: '',
        responsable: {
            prenom: '',
            nom: '',
            postnom: '',
            email: '',
            telephone: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [popupMessage, setPopupMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleResponsableChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            responsable: {
                ...prev.responsable,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(registerRoute, formData, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Erreur serveur');
            }

            const data = response.data;
            console.log('Réponse du backend:', data);

            await signInWithCustomToken(auth, data.admin.customToken);

            const idToken = await auth.currentUser.getIdToken();
            localStorage.setItem('idToken', idToken);

            // Afficher un message de succès avec le mot de passe temporaire
            setPopupMessage(`Bienvenu chez J-napps! Votre mot de passe est ${data.admin.motDePasseTemporaire}. Veuillez le changer par la suite.`);

        } catch (error) {
            console.error('Erreur:', error);
            setError(error.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-auto mb-auto bg-white shadow-lg rounded-lg relative">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-12">
                    <Heading level="h2" children="Créer une organisation" className="px-4 mt-4 text-xl font-bold text-center text-orange-600" />

                    <div className="w-1/4">
                        <Button text="Enregistrer" type="submit" />
                    </div>
                </div>

                {/* Informations générales */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Informations générales"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/*<Input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="Code"
                        />*/}
                        
                        <Input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            placeholder="Désignation de l'organisation"
                        />
                        <Input
                            type="text"
                            name="sigle"
                            value={formData.sigle}
                            onChange={handleChange}
                            placeholder="Sigle officiel"
                        />
                        <Input
                            type="text"
                            name="rccm"
                            value={formData.rccm}
                            onChange={handleChange}
                            placeholder="Numéro RCCM"
                        />
                    </div>
                </div>

                {/* Coordonnées */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Coordonnées"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="text"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                            placeholder="Siège social"
                        />
                        <Input
                            type="tel"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            placeholder="Numéro de téléphone officiel"
                        />
                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Addresse email officielle"
                        />
                        <Input
                            type="text"
                            name="siteWeb"
                            value={formData.siteWeb}
                            onChange={handleChange}
                            placeholder="Site web de l'organisation"
                        />
                    </div>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Responsable de l'organisation"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            type="text"
                            name="nom"
                            value={formData.responsable.nom}
                            onChange={handleResponsableChange}
                            placeholder="Nom"
                        />
                        <Input
                            type="text"
                            name="postnom"
                            value={formData.responsable.postnom}
                            onChange={handleResponsableChange}
                            placeholder="Postnom"
                        />
                        <Input
                            type="text"
                            name="prenom"
                            value={formData.responsable.prenom}
                            onChange={handleResponsableChange}
                            placeholder="Prénom"
                        />
                        <Input
                            type="email"
                            name="email"
                            value={formData.responsable.email}
                            onChange={handleResponsableChange}
                            placeholder="Addresse email"
                        />
                        <Input
                            type="tel"
                            name="telephone"
                            value={formData.responsable.telephone}
                            onChange={handleResponsableChange}
                            placeholder="Numéro de téléphone"
                        />
                    </div>
                </div>

                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}
            </form>

            <Popup
                message={popupMessage}
                onClose={() => {
                    setPopupMessage(null);
                    router.push('/dashboard');
                }}
            />
        </div>
    );
}