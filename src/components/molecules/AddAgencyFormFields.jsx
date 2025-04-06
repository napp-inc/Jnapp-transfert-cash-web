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
        localisation: {
            latitude: 0,
            longitude: 0
        }
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleLocalisationChange = (e) => {
        setFormData(prev => ({
            ...prev,
            localisation: {
                ...prev.localisation,
                [e.target.name]: e.target.value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Données à envoyer:', formData);

        try {
            const token = localStorage.getItem("idToken");
            console.log(token)

            if (!token) {
                alert("Vous n'êtes pas connecté !");
            }
            const requestData = {
                ...formData,
                localisation: {
                    latitude: parseFloat(formData.localisation.latitude),
                    longitude: parseFloat(formData.localisation.longitude)
                }
            };

            const response = await fetch(addAgencyRoute, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Agence créée avec succès');
                setFormData({
                    code: '',
                    designation: '',
                    addresse: '',
                    localisation: {
                        latitude: 0,
                        longitude: 0
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

                {/* Long et Lat */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Géolocalisation de l'agence"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="number"
                                step="any"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleLocalisationChange}
                                placeholder="Latitude"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input
                                type="number"
                                step="any"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleLocalisationChange}
                                placeholder="Longitude"
                            />
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}