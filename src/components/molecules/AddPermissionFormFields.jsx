"use client";
import React from 'react';
import { useState } from 'react';
import Heading from '../atoms/Heading';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { addPermissionRoute } from '../../endPointsAndKeys'; // Create this endpoint

export default function AddPermissionFormFields() {
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
            const response = await fetch(addPermissionRoute, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Permission créée avec succès');
                setFormData({
                    code: '',
                    designation: ''
                });
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la création de la permission');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-12">
                    <Heading
                        level="h2"
                        children="Créer une permission"
                        className="px-4 mt-4 text-xl font-bold text-center text-orange-600"
                    />

                    <div className="w-1/4">
                        <Button text="Enregistrer" type="submit" />
                    </div>
                </div>

                {/* Section Informations de la permission */}
                <div className="p-6 rounded-lg mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="Code de permission (ex: CR-ORG)"
                                required
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Description (ex: Créer une organisation)"
                                required
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}