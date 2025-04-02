"use client"
import React from 'react';
import { useState } from 'react';
import Heading from '../atoms/Heading';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import addAgentRoute from '../../endPointsAndKeys';

export default function AddAgentFormFields() {
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        postnom: '',
        email: '',
        telephone: '',
        adresse: '',
        agence: {
            reference: '',
            code: '',
            designation: ''
        },
        organisation: {
            reference: '',
            code: '',
            designation: ''
        },
        role: {
            reference: '',
            code: '',
            designation: ''
        }
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleNestedChange = (section) => (e) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [e.target.name]: e.target.value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Données à envoyer:', formData);

        try {
            const response = await fetch(addAgentRoute, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Agent créé avec succès');
                setFormData({
                    prenom: '',
                    nom: '',
                    postnom: '',
                    email: '',
                    telephone: '',
                    adresse: '',
                    agence: {
                        reference: '',
                        code: '',
                        designation: ''
                    },
                    organisation: {
                        reference: '',
                        code: '',
                        designation: ''
                    },
                    role: {
                        reference: '',
                        code: '',
                        designation: ''
                    }
                });
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la création');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-12">
                    <Heading
                        level="h2"
                        children="Créer un nouvel agent"
                        className="px-4 mt-4 text-xl font-bold text-center text-orange-600"
                    />
                    <div className="w-1/4">
                        <Button text="Enregistrer" type="submit" />
                    </div>
                </div>

                {/* Informations personnelles */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Informations personnelles"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                placeholder="Prénom"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                placeholder="Nom"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="postnom"
                                value={formData.postnom}
                                onChange={handleChange}
                                placeholder="Postnom"
                            />
                        </div>

                        <div className="col-span-full md:col-span-1">
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Adresse email"
                                required
                            />
                        </div>

                        <div className="col-span-full md:col-span-1">
                            <Input
                                type="tel"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                                placeholder="Numéro de téléphone"
                                required
                            />
                        </div>

                        <div className="col-span-full">
                            <Input
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleChange}
                                placeholder="Adresse"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Agence */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Agence"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="reference"
                                value={formData.agence.reference}
                                onChange={handleNestedChange('agence')}
                                placeholder="Référence agence"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="code"
                                value={formData.agence.code}
                                onChange={handleNestedChange('agence')}
                                placeholder="Code agence"
                                required
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input
                                type="text"
                                name="designation"
                                value={formData.agence.designation}
                                onChange={handleNestedChange('agence')}
                                placeholder="Désignation agence"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Organisation */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Organisation"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="reference"
                                value={formData.organisation.reference}
                                onChange={handleNestedChange('organisation')}
                                placeholder="Référence organisation"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="code"
                                value={formData.organisation.code}
                                onChange={handleNestedChange('organisation')}
                                placeholder="Code organisation"
                                required
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input
                                type="text"
                                name="designation"
                                value={formData.organisation.designation}
                                onChange={handleNestedChange('organisation')}
                                placeholder="Désignation organisation"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Rôle */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Rôle"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="reference"
                                value={formData.role.reference}
                                onChange={handleNestedChange('role')}
                                placeholder="Référence rôle"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="code"
                                value={formData.role.code}
                                onChange={handleNestedChange('role')}
                                placeholder="Code rôle"
                                required
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input
                                type="text"
                                name="designation"
                                value={formData.role.designation}
                                onChange={handleNestedChange('role')}
                                placeholder="Désignation rôle"
                                required
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}