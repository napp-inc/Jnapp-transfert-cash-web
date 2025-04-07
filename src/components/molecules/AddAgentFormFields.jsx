"use client";
import React from "react";
import { useState } from "react";
import Heading from "../atoms/Heading";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { addAgentRoute } from "../../endPointsAndKeys";


export default function AddAgentFormFields() {
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        postnom: "",
        email: "",
        telephone: "",
        adresse: "",
        password: "",
        agence: {
            code: "",
            designation: "",
        },
    });

    // Handle changes for top-level fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle changes for nested fields in `agence`
    const handleNestedChange = (section) => (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value,
            },
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Données à envoyer:", formData);

        try {
            const token = localStorage.getItem("idToken");
            if (!token) {
                alert("Vous n'êtes pas connecté !");
                return;
            };

            const response = await fetch(addAgentRoute, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Agent créé avec succès !");
                setFormData({
                    prenom: "",
                    nom: "",
                    postnom: "",
                    email: "",
                    telephone: "",
                    adresse: "",
                    password: "",
                    agence: {
                        code: "",
                        designation: "",
                    },
                });
            } else {
                const errorData = await response.json();
                alert(`Erreur lors de la création: ${errorData.message || "Erreur inconnue"}`);
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Une erreur s'est produite lors de la création.");
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
                        <div className="col-span-full md:col-span-1">
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Mot de passe"
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
                                name="code"
                                value={formData.agence.code}
                                onChange={handleNestedChange("agence")}
                                placeholder="Code agence"
                                required
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <Input
                                type="text"
                                name="designation"
                                value={formData.agence.designation}
                                onChange={handleNestedChange("agence")}
                                placeholder="Désignation agence"
                                required
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}