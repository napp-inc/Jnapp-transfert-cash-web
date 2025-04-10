import { useState, useEffect } from "react";
import axios from "axios";
import { getAllAgentsRoute } from "../endPointsAndKeys";
import { DateTime } from "luxon";
import { auth } from "../firebase";
import { getIdToken } from "firebase/auth";

export default function useRole() {
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

        const response = await axios.get(getAllAgentsRoute, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const agentsArray = response?.data?.agences || [];
        console.log(agentsArray);

        const formattedData = agentsArray.map((agent) => ({
          prenom: agent.prenom || "",
          nom: agent.nom || "",
          postnom: agent.postnom || "",
          email: agent.email || "",
          telephone: agent.telephone || "",
          adresse: agent.adresse || "",
          "agence de référence": agent.agence?.code || "",
          role: agent.role?.code || "",
          "ajout par": agent.creator || "",
          "date d'ajout": agent?.dateCreation
            ? DateTime.fromMillis(Number(agence.dateCreation))
                .setLocale("fr")
                .toLocaleString(DateTime.DATETIME_MED)
            : "N/A",
          "date de modification": agent.dateDerniereModification
            ? DateTime.fromMillis(Number(agence.dateDerniereModification))
                .setLocale("fr")
                .toLocaleString(DateTime.DATETIME_MED)
            : "N/A",
        }));

        setData(formattedData);
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
