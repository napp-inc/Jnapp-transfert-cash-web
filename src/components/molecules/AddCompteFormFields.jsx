"use client";
import React, { useState } from "react";
import Heading from "../atoms/Heading";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Popup from "../atoms/Popup";
import { AddCompteRoute } from "../../endPointsAndKeys";

export default function CreateAccountForm() {
    const [formData, setFormData] = useState({
        numeroCompte: "",
        solde: 0,
        devise: "CDF",
        gestionnaire: "",
        banque: "",
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
                numeroCompte: formData.numeroCompte,
                solde: parseFloat(formData.solde),
                devise: formData.devise,
                gestionnaire: formData.gestionnaire,
                banque: formData.banque,
            };

            const response = await axios.post(AddCompteRoute, requestData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 || response.status === 201) {
                setPopupMessage("Compte créé avec succès !");
                setFormData({
                    numeroCompte: "",
                    solde: 0,
                    devise: "USD",
                    gestionnaire: "",
                    banque: "",
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
                        children="Ajouter un nouveau compte"
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
                                name="numeroCompte"
                                value={formData.numeroCompte}
                                onChange={handleChange}
                                placeholder="Numéro de compte"
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
                                placeholder="Devise (par ex. USD)"
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

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="banque"
                                value={formData.banque}
                                onChange={handleChange}
                                placeholder="ID de la banque"
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