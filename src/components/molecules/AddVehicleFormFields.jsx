"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../firebase";
import { getIdToken } from "firebase/auth";
import Heading from "../atoms/Heading";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Popup from "../atoms/Popup";
import { addVehicleRoute } from "../../endPointsAndKeys";

export default function AddVehicleForm() {
    const [popupMessage, setPopupMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        newVehicule: {
            immatriculation: "",
            marque: "",
            modele: "",
            driver: ""
        },
        creator: ""
    });

    const refreshIdToken = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const token = await getIdToken(user, true); // Rafraîchit le token
                localStorage.setItem("idToken", token);
                return token;
            } catch (error) {
                console.error("Erreur lors du rafraîchissement du token :", error);
                throw new Error("Impossible de rafraîchir le token.");
            }
        } else {
            throw new Error("Aucun utilisateur connecté.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("newVehicule.")) {
            const key = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                newVehicule: {
                    ...prev.newVehicule,
                    [key]: value
                }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const validateFormData = () => {
        const { immatriculation, marque, modele, driver } = formData.newVehicule;

        if (!immatriculation || !marque || !modele || !driver) {
            throw new Error("Tous les champs sont obligatoires.");
        }

        if (immatriculation.length < 6) {
            throw new Error("L'immatriculation doit contenir au moins 6 caractères.");
        }

        if (marque.length < 2 || modele.length < 2) {
            throw new Error("La marque et le modèle doivent contenir au moins 2 caractères.");
        }

        if (driver.length < 3) {
            throw new Error("Le nom du chauffeur doit contenir au moins 3 caractères.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPopupMessage(null);

        try {
            const user = auth.currentUser;
            if (!user) {
                setPopupMessage("Vous n'êtes pas connecté !");
                return;
            }

            let token = localStorage.getItem("idToken");
            if (!token) {
                token = await refreshIdToken();
            }

            validateFormData();

            const requestData = {
                ...formData,
                creator: user.uid
            };
            console.log("Données envoyées and token", requestData, token);

            // Envoyer la requête POST
            const response = await fetch(addVehicleRoute, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });  
            
            console.log("Réponse du backend :", response.data);

            if (response.status === 200 || response.status === 201) {
                setPopupMessage("Véhicule créé avec succès !");
                setFormData({
                    newVehicule: {
                        immatriculation: "",
                        marque: "",
                        modele: "",
                        driver: ""
                    },
                    creator: ""
                });
            } else {
                throw new Error("Erreur lors de la création du véhicule.");
            }
        } catch (error) {
            console.error("Erreur complète :", error);
            if (error.response) {
                console.error("Réponse du backend :", error.response.data);
                setPopupMessage(error.response.data.message || "Une erreur est survenue.");
            } else if (error.request) {
                console.error("Pas de réponse du serveur :", error.request);
                setPopupMessage("Pas de réponse du serveur. Vérifiez votre connexion.");
            } else {
                console.error("Erreur inconnue :", error.message);
                setPopupMessage(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // Préremplir le créateur une fois que l'utilisateur est connecté
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setFormData((prev) => ({
                ...prev,
                creator: user.uid
            }));
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-12">
                    <Heading
                        level="h2"
                        className="px-4 mt-4 text-xl font-bold text-center"
                    >
                        Ajouter un nouveau véhicule
                    </Heading>
                    <div className="w-1/4">
                        <Button text="Enregistrer" type="submit" disabled={loading} />
                    </div>
                </div>

                {loading && (
                    <div className="loader">Chargement...</div>
                )}

                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        className="px-4 mb-6 text-lg font-bold"
                    >
                        Informations du véhicule
                    </Heading>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="newVehicule.marque"
                                value={formData.newVehicule.marque}
                                onChange={handleChange}
                                placeholder="Marque"
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="newVehicule.modele"
                                value={formData.newVehicule.modele}
                                onChange={handleChange}
                                placeholder="Modèle"
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="newVehicule.immatriculation"
                                value={formData.newVehicule.immatriculation}
                                onChange={handleChange}
                                placeholder="Immatriculation"
                            />
                        </div>

                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="newVehicule.driver"
                                value={formData.newVehicule.driver}
                                onChange={handleChange}
                                placeholder="Chauffeur"
                            />
                        </div>
                    </div>
                </div>
            </form>

            {popupMessage && (
                <Popup
                    message={popupMessage}
                    onClose={() => setPopupMessage(null)}
                />
            )}
        </div>
    );
}