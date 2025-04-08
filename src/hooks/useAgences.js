import { useState, useEffect } from "react";
import axios from "axios";
import { getAllAgenciesRoute } from "../endPointsAndKeys";
import { DateTime } from "luxon";

export default function useAgences() {
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

                // Utilisation d'axios pour effectuer la requête GET
                const response = await axios.get(getAllAgenciesRoute, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const agencesArray = response?.data?.agences || [];

                const formattedAgencies = agencesArray.map((agence, index) => ({
                    id: index + 1,
                    code: agence?.code || "",
                    designation: agence?.designation || "",
                    adresse: agence?.adresse || "",
                    latitude: agence?.location?.latitude || "",
                    longitude: agence?.location?.longitude || "",
                    "date d'ajout": agence?.dateCreation
                        ? DateTime.fromMillis(Number(agence.dateCreation)).setLocale('fr').toLocaleString(DateTime.DATETIME_MED)
                        : "N/A",
                    "date de modification": agence.dateDerniereModification
                        ? DateTime.fromMillis(Number(agence.dateDerniereModification)).setLocale('fr').toLocaleString(DateTime.DATETIME_MED)
                        : "N/A"
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