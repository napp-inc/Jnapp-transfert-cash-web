
"use client";
import { useState } from 'react';

import Heading from '../atoms/Heading';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useRouter } from 'next/navigation';
import { addVehiclesRoute } from '../../endPointsAndKeys';

export default function AddVehicleFields() {
    const [formData, setFormData] = useState({
        marque: '',
        modele: '',
        immatriculation: '',
        organisation: {
            reference: '',
            code: '',
            designation: ''
        },
    });
    const router = useRouter();

    const handleInputChange = (e) => {
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
        // Logique d'envoi des données
        console.log('Données à envoyer:', formData);

        try {
            const response = await fetch(addVehiclesRoute, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Véhicule créé avec succès');
                // Réinitialisation du formulaire
                setFormData({
                    marque: '',
                    modele: '',
                    immatriculation: '',
                    organisation: {
                        reference: '',
                        code: '',
                        designation: ''
                    },
                    status: 'FREE'
                });
                router.push('/vehicules');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la création');
            router.push('/vehicules');
        }
    };

    return (
        <div className="max-w-3/4 mx-auto mask-t-from-5% p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-12">
                    <Heading level="h2" children="Ajout d'un nouveau véhicule" className="px-4 mt-4 text-xl font-bold text-center text-orange-600" />

                    <div className="w-1/4">
                        <Button text="Enregistrer" type="submit" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-full md:col-span-1">
                        <Input
                            type="text"
                            name="marque"
                            value={formData.marque}
                            onChange={handleInputChange}
                            placeholder="Marque/Fabricant"
                        />
                    </div>

                    <div className="col-span-full md:col-span-1">
                        <Input
                            type="text"
                            name="modele"
                            value={formData.modele}
                            onChange={handleInputChange}
                            placeholder="Modèle du véhicule"
                        />
                    </div>

                    <div className="col-span-full">
                        <Input
                            type="text"
                            name="immatriculation"
                            value={formData.immatriculation}
                            onChange={handleInputChange}
                            placeholder="Numéro d'immatriculation"
                        />
                    </div>
                </div>


                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <Heading level="h3" children="Informations de l'organisation" className="text-lg font-BOLD text-gray-800 mb-4" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input
                                type="text"
                                name="reference"
                                value={formData.organisation.reference}
                                onChange={handleOrganisationChange}
                                placeholder='Numéro de réference'
                            />
                        </div>

                        <div>
                            <div>
                                <Input
                                    type="text"
                                    name="code"
                                    value={formData.organisation.reference}
                                    onChange={handleOrganisationChange}
                                    placeholder='Code'
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <Input
                                type="text"
                                name="designation"
                                value={formData.organisation.reference}
                                onChange={handleOrganisationChange}
                                placeholder="Désignation de l'entreprise/organisation"
                            />
                        </div>
                    </div>
                </div>


            </form>
        </div>
    );
};
