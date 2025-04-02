"use client"
import React from 'react';
import { useState } from 'react';

import Heading from '../atoms/Heading';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

import addOrganisationRoute from '../../endPointsAndKeys';


export default function AddOrganisationFormFields() {
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
        console.log('Données à envoyer:', formData);

        try {
            const response = await fetch(addOrganisationRoute, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Organisation créée avec succès');
                setFormData({
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
                    <Heading level="h2" children="Enregistrer une nouvelle organisation" className="px-4 mt-4 text-xl font-bold text-center text-orange-600" />

                    <div className="w-1/4">
                        <Button text="Enregistrer" type="submit" />
                    </div>
                </div>
                {/* Section Informations générales */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading level="h3" children="Informations générales" className="px-4 mb-6 text-lg font-bold text-orange-600" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="Code"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Désignation de l'organisation"
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="sigle"
                                value={formData.sigle}
                                onChange={handleChange}
                                placeholder="Sigles Officiels"
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="rccm"
                                value={formData.rccm}
                                onChange={handleChange}
                                placeholder="Numéro RCCM"
                            />
                        </div>
                    </div>
                </div>

                {/* Section Coordonnées */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading level="h3" children="Coordonnées" className="px-4 mb-6 text-lg font-bold text-orange-600" />


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleChange}
                                placeholder="Addresse"
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                                placeholder="Numéro de téléphone"
                            />
                        </div>

                        <div>
                            <Input
                                type="email"
                                name="email"
                                value={formData.rccm}
                                onChange={handleChange}
                                placeholder="Addresse email"
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                name="siteWeb"
                                value={formData.siteWeb}
                                onChange={handleChange}
                                placeholder="Site internet"
                            />
                        </div>
                    </div>
                </div>

                {/* Section Responsable */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading level="h3" children="Responsable de l'organisation" className="px-4 mb-6 text-lg font-bold text-orange-600" />



                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Input
                                type="text"
                                name="prenom"
                                value={formData.responsable.prenom}
                                onChange={handleResponsableChange}
                                placeholder="Prénom"
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                name="nom"
                                value={formData.responsable.nom}
                                onChange={handleResponsableChange}
                                placeholder="Nom"
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                name="postnom"
                                value={formData.responsable.postnom}
                                onChange={handleResponsableChange}
                                placeholder="Postnom"
                            />
                        </div>

                        <div className="col-span-full md:col-span-1">
                            <Input
                                type="email"
                                name="email"
                                value={formData.responsable.email}
                                onChange={handleResponsableChange}
                                placeholder="Addresse email"
                            />
                        </div>

                        <div className="col-span-full md:col-span-1">
                            <Input
                                type="text"
                                name="telephone"
                                value={formData.responsable.telephone}
                                onChange={handleResponsableChange}
                                placeholder="Numéro de téléphone"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
