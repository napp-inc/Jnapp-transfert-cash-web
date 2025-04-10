import { useState, useEffect } from "react";
import axios from "axios";
import { getAllVehiclesRoute } from "../endPointsAndKeys";
import { DateTime } from "luxon";
import { auth } from "../firebase";
import { getIdToken } from "firebase/auth";

export default function useVehicule() {
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
        const response = await axios.get(getAllVehiclesRoute, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        const vehiculesArray = response?.data?.elems || [];

        const formattedVehicules = vehiculesArray.map((vehicule, index) => ({
          id: index + 1,
          reference: vehicule?.id || "",
          marque: vehicule?.marque || "",
          modele: vehicule?.modele || "",
          immatriculation: vehicule?.immatriculation || "",
          etat:
            vehicule?.statut === "USED"
              ? "EN COURSE"
              : vehicule?.statut === "FREE"
              ? "DISPONIBLE"
              : "N/A",
          "date d'ajout": vehicule?.createdAt?._seconds
            ? DateTime.fromMillis(
                vehicule.createdAt._seconds * 1000 +
                  Math.floor(vehicule.createdAt._nanoseconds / 1e6)
              )
                .setLocale("fr")
                .toLocaleString(DateTime.DATETIME_MED)
            : "N/A",
        }));

        if (response) {
          console.log(formattedVehicules);
        } else {
          console.log("soorry, raf");
        }

        setData(formattedVehicules);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des véhicules");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
