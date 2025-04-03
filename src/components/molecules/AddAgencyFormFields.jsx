"use client"
import React from 'react';
import { useState } from 'react';
import Heading from '../atoms/Heading';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { addAgencyRoute } from '../../endPointsAndKeys';

export default function AddAgenceFormFields() {
    const [formData, setFormData] = useState({
        code: '',
        designation: '',
        addresse: '',
        organisation: {
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

    const handleOrganisationChange = (e) => {
        setFormData(prev => ({
            ...prev,
            organisation: {
                ...prev.organisation,
                [e.target.name]: e.target.value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Données à envoyer:', formData);

        try {
            const response = await fetch(addAgencyRoute, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Agence créée avec succès');
                setFormData({
                    code: '',
                    designation: '',
                    addresse: '',
                    organisation: {
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
                        children="Créer une nouvelle agence"
                        className="px-4 mt-4 text-xl font-bold text-center text-orange-600"
                    />
                    <div className="w-1/4">
                        <Button text="Enregistrer" type="submit" />
                    </div>
                </div>

                {/* Informations principales */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Informations de l'agence"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="Code agence"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Désignation de l'agence"
                            />
                        </div>

                        <div className="col-span-full md:col-span-1">
                            <Input
                                type="text"
                                name="addresse"
                                value={formData.addresse}
                                onChange={handleChange}
                                placeholder="Adresse"
                            />
                        </div>
                    </div>
                </div>

                {/* Organisation rattachée */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Organisation rattachée"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="reference"
                                value={formData.organisation.reference}
                                onChange={handleOrganisationChange}
                                placeholder="Référence organisation"
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="code"
                                value={formData.organisation.code}
                                onChange={handleOrganisationChange}
                                placeholder="Code organisation"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input
                                type="text"
                                name="designation"
                                value={formData.organisation.designation}
                                onChange={handleOrganisationChange}
                                placeholder="Désignation organisation"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}