"use client"
import React, { useState } from 'react';
import Heading from '../atoms/Heading';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Button from '../atoms/Button';
import { initTransfertRoute } from '../../endPointsAndKeys.js';

export default function InitiateTransfert() {
    const [formData, setFormData] = useState({
        typeProprietaireA: '',
        typeProprietaireB: '',
        valeurTypeProprietaireA: {
            reference: '',
            code: '',
            designation: '',
            numeroCompte: ''
        },
        valeurTypeProprietaireB: {
            reference: '',
            code: '',
            designation: '',
            numeroCompte: ''
        },
        montant: '',
        agentMissions: [], // Tableau pour stocker les agents
    });

    const handleMainChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handler spécifique pour le tableau agentMissions
    const handleAgentMissionsChange = (e) => {
        const values = e.target.value.split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);

        setFormData(prev => ({
            ...prev,
            agentMissions: values
        }));
    };

    const handleProprietaireAChange = (e) => {
        setFormData(prev => ({
            ...prev,
            valeurTypeProprietaireA: {
                ...prev.valeurTypeProprietaireA,
                [e.target.name]: e.target.value
            }
        }));
    };

    const handleProprietaireBChange = (e) => {
        setFormData(prev => ({
            ...prev,
            valeurTypeProprietaireB: {
                ...prev.valeurTypeProprietaireB,
                [e.target.name]: e.target.value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Données à envoyer:', formData);

        try {
            const response = await fetch(initTransfertRoute, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Transfert initié avec succès');
                setFormData({
                    typeProprietaireA: '',
                    typeProprietaireB: '',
                    valeurTypeProprietaireA: {
                        reference: '',
                        code: '',
                        designation: '',
                        numeroCompte: ''
                    },
                    valeurTypeProprietaireB: {
                        reference: '',
                        code: '',
                        designation: '',
                        numeroCompte: ''
                    },
                    montant: '',
                    agentMissions: []
                });
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert("Erreur lors de l'initialisation");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-12">
                    <Heading level="h2" children="Contre vérification du transfert" className="px-4 mt-4 text-xl font-bold text-center text-orange-600" />
                    <div className="w-1/4">
                        <Button text="Contre Vérifier" type="submit" />
                    </div>
                </div>

                {/* Section Propriétaire A */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading level="h3" children="Origine du transfert" className="px-4 mb-6 text-lg font-bold text-orange-600" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Select
                            name="typeProprietaireA"
                            value={formData.typeProprietaireA}
                            onChange={handleMainChange}
                            options={[
                                { value: 'Caisse', label: 'Caisse' },
                                { value: 'Compte', label: 'Compte' }
                            ]}
                            placeholder="Type de propriétaire"
                        />
                        <Input
                            type="text"
                            name="reference"
                            value={formData.valeurTypeProprietaireA.reference}
                            onChange={handleProprietaireAChange}
                            placeholder="Référence"
                        />
                        <Input
                            type="text"
                            name="code"
                            value={formData.valeurTypeProprietaireA.code}
                            onChange={handleProprietaireAChange}
                            placeholder="Code"
                        />
                        <Input
                            type="text"
                            name="designation"
                            value={formData.valeurTypeProprietaireA.designation}
                            onChange={handleProprietaireAChange}
                            placeholder="Désignation"
                        />
                        <Input
                            type="text"
                            name="numeroCompte"
                            value={formData.valeurTypeProprietaireA.numeroCompte}
                            onChange={handleProprietaireAChange}
                            placeholder="Numéro de compte"
                        />
                    </div>
                </div>

                {/* Section Propriétaire B */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading level="h3" children="Destination du transfert" className="px-4 mb-6 text-lg font-bold text-orange-600" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Select
                            name="typeProprietaireB"
                            value={formData.typeProprietaireB}
                            onChange={handleMainChange}
                            options={[
                                { value: 'Caisse', label: 'Caisse' },
                                { value: 'Compte', label: 'Compte' }
                            ]}
                            placeholder="Type de propriétaire"
                        />
                        <Input
                            type="text"
                            name="reference"
                            value={formData.valeurTypeProprietaireB.reference}
                            onChange={handleProprietaireBChange}
                            placeholder="Référence"
                        />
                        <Input
                            type="text"
                            name="code"
                            value={formData.valeurTypeProprietaireB.code}
                            onChange={handleProprietaireBChange}
                            placeholder="Code"
                        />
                        <Input
                            type="text"
                            name="designation"
                            value={formData.valeurTypeProprietaireB.designation}
                            onChange={handleProprietaireBChange}
                            placeholder="Désignation"
                        />
                        <Input
                            type="text"
                            name="numeroCompte"
                            value={formData.valeurTypeProprietaireB.numeroCompte}
                            onChange={handleProprietaireBChange}
                            placeholder="Numéro de compte"
                        />
                    </div>
                </div>

                {/* Section Détails du transfert */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading level="h3" children="Détails du transfert" className="px-4 mb-6 text-lg font-bold text-orange-600" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            name="montant"
                            value={formData.montant}
                            onChange={handleMainChange}
                            placeholder="Montant déplacé"
                        />
                        <Input
                            type="text"
                            name="agentMissions"
                            value={formData.agentMissions.join(', ')} // Affichage du tableau sous forme de string
                            onChange={handleAgentMissionsChange}
                            placeholder="Agents affectés (séparés par des virgules)"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
