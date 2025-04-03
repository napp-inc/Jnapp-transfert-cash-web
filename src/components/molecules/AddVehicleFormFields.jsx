"use client"
import React from 'react';
import { useState } from 'react';

import Heading from '../atoms/Heading';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

//import { useRouter } from 'next/navigation';
import { addVehicleRoute } from '../../endPointsAndKeys';

export default function AddVehicleForm() {
    const [formData, setFormData] = useState({
        marque: '',
        modele: '',
        immatriculation: '',
        organisation: {
            reference: '',
            code: '',
            designation: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOrganisationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            organisation: {
                ...prev.organisation,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Données à envoyer:', formData);

        try {
            const response = await fetch(addVehicleRoute, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Véhicule ajouté avec succès');
                setFormData({
                    marque: '',
                    modele: '',
                    immatriculation: '',
                    organisation: {
                        reference: '',
                        code: '',
                        designation: ''
                    }
                });
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'ajout du véhicule');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-12">
                    <Heading level="h2" children="Ajouter un nouveau véhicule" className="px-4 mt-4 text-xl font-bold text-center text-orange-600" />

                    <div className="w-1/4">
                        <Button text="Enregistrer" type="submit" />
                    </div>
                </div>

                {/* Section Informations du véhicule */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading level="h3" children="Informations du véhicule" className="px-4 mb-6 text-lg font-bold text-orange-600" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="marque"
                                value={formData.marque}
                                onChange={handleChange}
                                placeholder="Marque"
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="modele"
                                value={formData.modele}
                                onChange={handleChange}
                                placeholder="Modèle"
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="immatriculation"
                                value={formData.immatriculation}
                                onChange={handleChange}
                                placeholder="Immatriculation"
                            />
                        </div>
                    </div>
                </div>

                {/* Section Informations organisation */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading level="h3" children="Informations organisation" className="px-4 mb-6 text-lg font-bold text-orange-600" />

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

                        <div className="col-span-1">
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
};