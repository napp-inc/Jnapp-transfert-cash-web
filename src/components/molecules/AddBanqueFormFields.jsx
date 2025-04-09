"use client";
import React, { useState } from "react";
import axios from "axios";
import Heading from "../atoms/Heading";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Popup from "../atoms/Popup";
import { AddBanqueRoute } from "../../endPointsAndKeys";

export default function CreateBankForm() {
    const [formData, setFormData] = useState({
        designation: "",
        adresse: "",
        telephone: "",
        email: "",
        siteWeb: "",
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
                adresse: formData.adresse,
                telephone: formData.telephone,
                email: formData.email,
                siteWeb: formData.siteWeb,
            };

            // Utilisation de Axios pour envoyer les données
            const response = await axios.post(AddBanqueRoute, requestData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 || response.status === 201) {
                setPopupMessage("Banque créée avec succès !");
                setFormData({
                    designation: "",
                    adresse: "",
                    telephone: "",
                    email: "",
                    siteWeb: "",
                });
            } else {
                throw new Error(response.data.message || "Erreur lors de la création de la banque");
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
                        children="Créer une nouvelle banque"
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
                        children="Informations de la banque"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Désignation (par ex. FirstBank)"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleChange}
                                placeholder="Adresse (par ex. Limete)"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                                placeholder="Téléphone (par ex. +243998898846)"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email (par ex. contact@firstbank.cd)"
                                required
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="siteWeb"
                                value={formData.siteWeb}
                                onChange={handleChange}
                                placeholder="Site web (par ex. firstbank.cd)"
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