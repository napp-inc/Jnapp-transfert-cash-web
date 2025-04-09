import { useState, useEffect } from "react";
import axios from "axios";
import { getAllVehiclesRoute } from "../endPointsAndKeys";
import { DateTime } from "luxon";

export default function useVehicule() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("idToken");

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

                const formattedVehicules = vehiculesArray.map((vehicule, index) => {
                    const createdAt = vehicule?.createdAt?._seconds
                        ? DateTime.fromMillis(
                            vehicule.createdAt._seconds * 1000 + Math.floor(vehicule.createdAt._nanoseconds / 1e6)
                        )
                            .setLocale("fr")
                            .toLocaleString(DateTime.DATETIME_MED)
                        : "N/A";

                    return {
                        id: index + 1,
                        reference: vehicule?.id || "",
                        marque: vehicule?.marque || "",
                        modele: vehicule?.modele || "",
                        immatriculation: vehicule?.immatriculation || "",
                        etat: vehicule?.statut === "USED"
                            ? "EN COURSE"
                            : vehicule?.statut === "FREE"
                                ? "DISPONIBLE"
                                : "N/A",
                        "date d'ajout": createdAt, // Clé sans espace
                    };
                });

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