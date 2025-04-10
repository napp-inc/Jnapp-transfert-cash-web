"use client";

import React, { useState } from "react";
import axios from "axios";
import Heading from "../atoms/Heading";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Select from "../atoms/Select";
import { addAgentRoute } from "../../endPointsAndKeys";
import useAgences from "../../hooks/useAgences";
import useRole from "../../hooks/useRoles";
import useIdToken from "../../hooks/useIdToken";
import { auth } from "../../firebase";

export default function AddAgentFormFields() {
  const agences = useAgences().data || [];
  const roles = useRole().data || [];
  const { token, erreur } = useIdToken(auth);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    postnom: "",
    email: "",
    telephone: "",
    adresse: "",
    photo: "",
    agence: "",
    role: "x5tmxJwNMcC95hZ3V0q7", // À changer quand on aura l'endpoint de rôle
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Données à envoyer:", formData);

    try {
      if (!token) {
        setPopupMessage(erreur.message || "Une erreur est survenue");
      }

      const response = await axios.post(addAgentRoute, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Agent créé avec succès !");
        setFormData({
          prenom: "",
          nom: "",
          postnom: "",
          email: "",
          telephone: "",
          adresse: "",
          password: "",
          agence: "",
          role: "x5tmxJwNMcC95hZ3V0q7", // À changer quand on aura l'endpoint de rôle
        });
      } else {
        throw new Error(response.data.message || "Erreur inconnue");
      }
    } catch (error) {
      console.error("Erreur:", error);
      if (error.response) {
        alert(
          `Erreur lors de la création: ${
            error.response.data.message || "Erreur inconnue"
          }`
        );
      } else if (error.request) {
        alert("Pas de réponse du serveur. Vérifiez votre connexion.");
      } else {
        alert("Une erreur s'est produite lors de la création.");
      }
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
          </div>
        </div>

        {/* Agence et rôle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <Select
              name="agence"
              value={formData.agence}
              onChange={handleChange}
              options={agences.map((agence) => ({
                value: agence.reference,
                label: agence.designation,
              }))}
              placeholder="Sélectionnez une agence"
            />
          </div>

          <Select // À changer quand on aura l'endpoint de rôle
            name="role"
            value="x5tmxJwNMcC95hZ3V0q7"
            onChange={handleChange}
            options={[
              {
                value: "x5tmxJwNMcC95hZ3V0q7",
                label: "Admin",
              },
            ]}
            placeholder="Sélectionnez un rôle"
          />

          {/*<div className="col-span-1">
                        <Select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            options={roles.map((role) => ({
                                value: role.reference,
                                label: role.designation,
                            }))}
                            placeholder="Sélectionnez un rôle"
                        />
                    </div>*/}
        </div>
      </form>
    </div>
  );
}
