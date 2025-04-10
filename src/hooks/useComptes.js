import { useState, useEffect } from "react";
import axios from "axios";
import { getCompteRoute } from "../endPointsAndKeys";
import { auth } from "../firebase";
import { getIdToken } from "firebase/auth";

export default function useCompte() {
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
        const response = await axios.get(getCompteRoute, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const caissesArray = response?.data?.caisses || [];
        console.log(caissesArray);

        const formattedCaisses = caissesArray.map((caisse, index) => ({
          id: index + 1,
          reference: caisse?.id || "",
          numero: caisse?.designation || "",
          devise: caisse?.devise || "",
          banque: caisse?.agence || "",
          solde: caisse?.solde || "",
          gestionnaire: caisse?.gestionnaire || "",
        }));

        setData(formattedCaisses);
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
