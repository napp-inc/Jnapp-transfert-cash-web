"use client";
import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Heading from "../atoms/Heading";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Popup from "../atoms/Popup";
import { addAgencyRoute } from "../../endPointsAndKeys";
import { apiKeyGoogleMaps } from "../../endPointsAndKeys";

const defaultCenter = { lat: -4.389892, lng: 15.313868 };

export default function AddAgenceFormFields() {
    const [formData, setFormData] = useState({
        code: "",
        designation: "",
        adresse: "",
        localisation: {
            latitude: defaultCenter.lat,
            longitude: defaultCenter.lng,
        },
    });

    const [selectedPosition, setSelectedPosition] = useState(defaultCenter); // État pour la position sur la carte
    const [popupMessage, setPopupMessage] = useState(null); // État pour le popup
    const [loading, setLoading] = useState(false); // État pour gérer le chargement

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleMapClick = (event) => {
        const { latLng } = event;
        const lat = latLng.lat();
        const lng = latLng.lng();

        setSelectedPosition({ lat, lng });
        setFormData((prev) => ({
            ...prev,
            localisation: {
                latitude: lat,
                longitude: lng,
            },
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
                ...formData,
                localisation: {
                    latitude: parseFloat(formData.localisation.latitude),
                    longitude: parseFloat(formData.localisation.longitude),
                },
            };

            const response = await fetch(addAgencyRoute, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                setPopupMessage("Agence créée avec succès !");
                setFormData({
                    code: "",
                    designation: "",
                    adresse: "",
                    localisation: {
                        latitude: defaultCenter.lat,
                        longitude: defaultCenter.lng,
                    },
                });
                setSelectedPosition(defaultCenter);
            } else {
                throw new Error("Erreur lors de la création de l'agence");
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
                        children="Créer une nouvelle agence"
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
                        children="Informations de l'agence"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <Input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="Code agence"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <Input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Désignation de l'agence"
                            />
                        </div>

                        <div className="col-span-full md:col-span-1">
                            <Input
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleChange}
                                placeholder="Adresse"
                            />
                        </div>
                    </div>
                </div>

                {/* Carte Google Maps */}
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <Heading
                        level="h3"
                        children="Géolocalisation de l'agence"
                        className="px-4 mb-6 text-lg font-bold text-orange-600"
                    />

                    <LoadScript googleMapsApiKey={apiKeyGoogleMaps}>
                        <GoogleMap
                            mapContainerStyle={{ height: "400px", width: "100%", borderRadius: "10px" }}
                            center={selectedPosition}
                            zoom={15}
                            onClick={handleMapClick}
                        >
                            {selectedPosition && (
                                <Marker position={selectedPosition} />
                            )}
                        </GoogleMap>
                    </LoadScript>

                    <div className="mt-4">
                        <p>
                            Latitude:{" "}
                            <span className="font-bold">
                                {formData.localisation.latitude.toFixed(6)}
                            </span>
                        </p>
                        <p>
                            Longitude:{" "}
                            <span className="font-bold">
                                {formData.localisation.longitude.toFixed(6)}
                            </span>
                        </p>
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