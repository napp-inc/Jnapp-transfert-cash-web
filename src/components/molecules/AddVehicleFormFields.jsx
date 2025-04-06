"use client";
import React, { useState } from "react";
import Heading from "../atoms/Heading";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { addVehicleRoute } from "../../endPointsAndKeys";

export default function AddVehicleForm() {
    const [formData, setFormData] = useState({
        marque: "",
        modele: "",
        immatriculation: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.marque || !formData.modele || !formData.immatriculation) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const token = localStorage.getItem("idToken");

            if (!token) {
                alert("Vous n'êtes pas connecté !");
                return;
            }

            const response = await fetch(addVehicleRoute, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Véhicule ajouté avec succès");
                setFormData({
                    marque: "",
                    modele: "",
                    immatriculation: ""
                });
            } else {
                const errorData = await response.json();
                console.error("Erreur de création:", errorData);
                alert(`Erreur lors de l'ajout du véhicule: ${errorData.message || "Une erreur est survenue"}`);
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur lors de l'ajout du véhicule");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-12">
                    <Heading
                        level="h2"
                        children="Ajouter un nouveau véhicule"
                        className="px-4 mt-4 text-xl font-bold text-center"
                    />
                    <div className="w-1/4">
                        <Button text="Enregistrer" type="submit" />
                    </div>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Informations du véhicule"
                        className="px-4 mb-6 text-lg font-bold"
                    />

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
            </form>
        </div>
    );
}