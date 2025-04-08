import { useState, useEffect } from "react";
import axios from "axios";
import { getAllAgenciesRoute } from "../endPointsAndKeys";
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

                const vehiculesArray = response?.data?.vehicules || [];
                console.log(vehiculesArray);

                const formattedvehicule = agencesArray.map((vehicule, index) => ({
                    id: index + 1,
                    reference: vehicule?.id || "",
                    marque: vehicule?.marque || "",
                    modele: vehicule?.modele || "",
                    immatriculation: vehicule?.immatriculation || "",
                    etat: vehicule?.status === "USED" ? "EN COURSE" : vehicule?.status === "FREE" ? "DISPONIBLE" : "N/A",
                    "date d'ajout": agence?.dateCreation
                        ? DateTime.fromMillis(Number(agence.dateCreation)).setLocale('fr').toLocaleString(DateTime.DATETIME_MED)
                        : "N/A",
                    "date de modification": agence?.dateDerniereModification
                        ? DateTime.fromMillis(Number(agence.dateDerniereModification)).setLocale('fr').toLocaleString(DateTime.DATETIME_MED)
                        : "N/A"
                }));

                setData(formattedvehicule);
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