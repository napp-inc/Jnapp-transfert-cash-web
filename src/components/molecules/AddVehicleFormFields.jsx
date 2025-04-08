"use client"; // Ce fichier est explicitement un composant côté client

import React, { useState } from "react";
import Heading from "../atoms/Heading";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Popup from "../atoms/Popup";
import { addVehicleRoute } from "../../endPointsAndKeys";
import { auth } from "../../firebase";
import axios from "axios";

export default function AddVehicleForm() {
    const [popupMessage, setPopupMessage] = useState(null); // État pour le popup
    const [loading, setLoading] = useState(false); // État pour le chargement
    const [formData, setFormData] = useState({
        newVehicule: {
            immatriculation: "",
            marque: "",
            modele: "",
            driver: ""
        },
        creator: ""
    });

    // Gestion des changements dans les champs imbriqués
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Si le champ appartient à `newVehicule`, on met à jour cet objet spécifique
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
            // Sinon, on met à jour directement formData
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPopupMessage(null);

        try {
            // Vérification de l'utilisateur connecté
            const user = auth.currentUser;
            if (!user) {
                setPopupMessage("Vous n'êtes pas connecté !");
                return;
            }
            const token = localStorage.getItem("idToken");
            if (!token) {
                setPopupMessage("Erreur lors de la récupération du token.");
                return;
            }

            // Préparation des données à envoyer
            const requestData = {
                ...formData,
                creator: user.uid
            };
            console.log(requestData);
            // Envoi de la requête POST avec Axios directement
            const response = await axios.post(addVehicleRoute, requestData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            
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
            console.error("Erreur:", error);
            if (error.response) {
                // Erreur renvoyée par le serveur
                setPopupMessage(error.response.data.message || "Une erreur est survenue.");
            } else {
                // Erreur réseau ou autre
                setPopupMessage(error.message || "Une erreur est survenue.");
            }
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
                        className="px-4 mt-4 text-xl font-bold text-center"
                    >
                        Ajouter un nouveau véhicule
                    </Heading>
                    <div className="w-1/4">
                        <Button text="Enregistrer" type="submit" />
                    </div>
                </div>

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

            {/* Affichage du popup */}
            {popupMessage && (
                <Popup
                    message={popupMessage}
                    onClose={() => setPopupMessage(null)}
                />
            )}
        </div>
    );
}