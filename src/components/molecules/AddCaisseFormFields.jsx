"use client";
import React, { useState } from "react";
import axios from "axios";
import Heading from "../atoms/Heading";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Popup from "../atoms/Popup";
import { AddCaisseRoute } from "../../endPointsAndKeys";

export default function CreateAccountForm() {
    const [formData, setFormData] = useState({
        designation: "",
        solde: 0,
        devise: "CDF",
        agence: "",
        gestionnaire: "",
    });

    const [popupMessage, setPopupMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPopupMessage(null);

        try {
            const token = localStorage.getItem("idToken");
            if (!token) {
                setPopupMessage("Vous n'êtes pas connecté !");
                return;
            }

            const requestData = {
                designation: formData.designation,
                solde: parseFloat(formData.solde),
                devise: formData.devise,
                agence: formData.agence,
                gestionnaire: formData.gestionnaire,
            };

            // Utilisation de Axios pour envoyer les données
            const response = await axios.post(AddCaisseRoute, requestData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 || response.status === 201) {
                setPopupMessage("Compte créé avec succès !");
                setFormData({
                    designation: "",
                    solde: 0,
                    devise: "CDF",
                    agence: "",
                    gestionnaire: "",
                });
            } else {
                throw new Error(response.data.message || "Erreur lors de la création du compte");
            }
        } catch (error) {
            console.error("Erreur:", error);
            setPopupMessage(error.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-12">
                    <Heading
                        level="h2"
                        children="Créer un nouveau compte"
                        className="px-4 mt-4 text-xl font-bold text-center text-orange-600"
                    />
                    <div className="w-1/4">
                        <Button
                            text={loading ? "Enregistrement..." : "Enregistrer"}
                            type="submit"
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Informations principales */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Informations du compte"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Désignation (par ex. Caisse principale)"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="number"
                                name="solde"
                                value={formData.solde}
                                onChange={handleChange}
                                placeholder="Solde initial"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="devise"
                                value={formData.devise}
                                onChange={handleChange}
                                placeholder="Devise (par ex. CDF)"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="agence"
                                value={formData.agence}
                                onChange={handleChange}
                                placeholder="ID de l'agence"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="gestionnaire"
                                value={formData.gestionnaire}
                                onChange={handleChange}
                                placeholder="ID du gestionnaire"
                                required
                            />
                        </div>
                    </div>
                </div>
            </form>

            {/* Affichage du popup */}
            <Popup
                message={popupMessage}
                onClose={() => setPopupMessage(null)}
            />
        </div>
    );
}