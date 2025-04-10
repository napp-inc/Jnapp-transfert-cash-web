"use client";
import React, { useState } from "react";
import Heading from "../atoms/Heading";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Popup from "../atoms/Popup";
import Select from "../atoms/Select";
import { AddCompteRoute } from "../../endPointsAndKeys";
import { auth } from "../../firebase";
import { getIdToken } from "firebase/auth";

export default function AddAccountFormFields() {
  const [formData, setFormData] = useState({
    numeroCompte: "",
    solde: 0,
    devise: "CDF",
    gestionnaire: "",
    banque: "",
  });
  const { token, erreur } = useIdToken(auth);
  const [popupMessage, setPopupMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
        throw new Error(
          response.data.message || "Erreur lors de la création du compte"
        );
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
              <Select
                name="devise"
                value={formData.devise}
                onChange={handleChange}
                options={["USD", "CDF"]}
                placeholder="Sélectionnez une banque"
              />

              <Select
                name="devise"
                value={formData.devise}
                onChange={handleChange}
                options={["USD", "CDF"]}
                placeholder="Devise"
              />
            </div>

            <div className="col-span-1">
              <Input
                type="text"
                name="gestionnaire"
                value={formData.gestionnaire}
                onChange={handleChange}
                placeholder="Gestionnaire"
                required
              />
            </div>

            <div className="col-span-1">
              <Select
                name="banque"
                value={formData.banque}
                onChange={handleChange}
                options={[]}
                placeholder="Sélectionnez une banque"
              />
            </div>
          </div>
        </div>
      </form>

      {/* Affichage du popup */}
      <Popup message={popupMessage} onClose={() => setPopupMessage(null)} />
    </div>
  );
}
