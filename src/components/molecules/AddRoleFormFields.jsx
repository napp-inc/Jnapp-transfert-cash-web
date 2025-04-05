"use client";
import React from 'react';
import { useState } from 'react';
import Heading from '../atoms/Heading';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { addRoleRoute } from '../../endPointsAndKeys'; // Create this endpoint

export default function AddRoleFormFields() {
    const [formData, setFormData] = useState({
        code: '',
        designation: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Données à envoyer:', formData);

        try {
            const response = await fetch(addRoleRoute, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Rôle créé avec succès');
                setFormData({
                    code: '',
                    designation: ''
                });
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la création du rôle');
        }
    };

    return (
        <div className="mx-auto sm:p-6 py-8 bg-white shadow-lg rounded-lg w-full max-w-md">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-12">
                    <Heading
                        level="h2"
                        children="Créer un rôle"
                        className="px-4 mt-4 text-xl font-bold text-center text-orange-600"
                    />

                    <div className="w-1/4">
                        <Button text="Enregistrer" type="submit" />
                    </div>
                </div>

                {/* Section Informations du rôle */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Informations du rôle"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="Code du rôle"
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Désignation du rôle"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}