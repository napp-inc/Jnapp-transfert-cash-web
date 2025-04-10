import { useState, useEffect } from "react";
import axios from "axios";
import { allTransfertsRoute } from "../endPointsAndKeys";
import { auth } from "../firebase";
import { getIdToken } from "firebase/auth";

export default function useTransfert() {
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

        const response = await axios.get(allTransfertsRoute, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Problème de connexion au serveur");
        }
        const result = await response.json();
        console.log(result);

        if (Array.isArray(result)) {
          setData(result);
        }
        else if (typeof result === "object" && result !== null) {
          setData([result]);
        } else {
          throw new Error("Format de données non reconnu");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
