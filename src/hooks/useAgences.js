import { useState, useEffect } from "react";
import axios from "axios";
import { getAllAgenciesRoute } from "../endPointsAndKeys";
import { DateTime } from "luxon";
import { auth } from "../firebase";
import { getIdToken } from "firebase/auth";

export default function useAgences() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
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

        if (!token) {
          throw new Error("Token non trouvé. Veuillez vous reconnecter.");
        }

        const response = await axios.get(getAllAgenciesRoute, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const agencesArray = response?.data?.agences || [];
        console.log(agencesArray);

        const formattedAgencies = agencesArray.map((agence, index) => ({
          id: index + 1,
          reference: agence?.id || "",
          code: agence?.code || "",
          designation: agence?.designation || "",
          adresse: agence?.adresse || "",
          latitude: agence?.location?.latitude || "",
          longitude: agence?.location?.longitude || "",
          "date d'ajout": agence?.dateCreation
            ? DateTime.fromMillis(Number(agence.dateCreation))
                .setLocale("fr")
                .toLocaleString(DateTime.DATETIME_MED)
            : "N/A",
          "date de modification": agence.dateDerniereModification
            ? DateTime.fromMillis(Number(agence.dateDerniereModification))
                .setLocale("fr")
                .toLocaleString(DateTime.DATETIME_MED)
            : "N/A",
        }));

        setData(formattedAgencies);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des agences");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
