import { useState, useEffect } from "react";
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

                const response = await fetch(getAllAgenciesRoute, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erreur serveur: ${response.status}`);
                }

                const result = await response.json();
                const agencesArray = result.agences || [];

                const formattedAgencies = agencesArray.map(agence => ({
                    code: agence.code || "",
                    designation: agence.designation || "",
                    adresse: agence.adresse || "",
                    "date d'ajout": agence.dateCreation 
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