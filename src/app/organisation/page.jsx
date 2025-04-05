"use client"
import React from 'react';
import { useState } from 'react';


const AjouterOrganisation = () => {
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
            const response = await fetch('/api/organisations', {
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
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
                Créer une organisation
            </h2>

            <form onSubmit={handleSubmit}>
                {/* Section Informations générales */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Informations générales
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <label className="block text-gray-700 mb-2">
                                Code
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </label>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 mb-2">
                                Désignation
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </label>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-gray-700 mb-2">
                                Sigle
                                <input
                                    type="text"
                                    name="sigle"
                                    value={formData.sigle}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </label>
                        </div>

                        <div className="col-span-1">
                            <label className="block text-gray-700 mb-2">
                                RCCM
                                <input
                                    type="text"
                                    name="rccm"
                                    value={formData.rccm}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Section Coordonnées */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Coordonnées
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Adresse
                                <input
                                    type="text"
                                    name="adresse"
                                    value={formData.adresse}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">
                                Téléphone
                                <input
                                    type="tel"
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">
                                Site web
                                <input
                                    type="url"
                                    name="siteWeb"
                                    value={formData.siteWeb}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Section Responsable */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Informations du responsable
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-gray-700 mb-2">
                                Prénom
                                <input
                                    type="text"
                                    name="prenom"
                                    value={formData.responsable.prenom}
                                    onChange={handleResponsableChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">
                                Nom
                                <input
                                    type="text"
                                    name="nom"
                                    value={formData.responsable.nom}
                                    onChange={handleResponsableChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">
                                Post-nom
                                <input
                                    type="text"
                                    name="postnom"
                                    value={formData.responsable.postnom}
                                    onChange={handleResponsableChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </label>
                        </div>

                        <div className="col-span-full md:col-span-1">
                            <label className="block text-gray-700 mb-2">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.responsable.email}
                                    onChange={handleResponsableChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </label>
                        </div>

                        <div className="col-span-full md:col-span-1">
                            <label className="block text-gray-700 mb-2">
                                Téléphone
                                <input
                                    type="tel"
                                    name="telephone"
                                    value={formData.responsable.telephone}
                                    onChange={handleResponsableChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Bouton de soumission */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Enregistrer l'organisation
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AjouterOrganisation;