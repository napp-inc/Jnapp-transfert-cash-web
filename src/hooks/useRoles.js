import { useState, useEffect } from "react";
import axios from "axios";
import { getAllAgentsRoute } from "../endPointsAndKeys";
import { DateTime } from "luxon";

export default function useRole() {
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
                const response = await axios.get(getAllAgentsRoute, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const agentsArray = response?.data?.agences || [];
                console.log(agentsArray);

                const formattedData = agentsArray.map((agent) => ({
                    "prenom": agent.prenom || "",
                    "nom": agent.nom || "",
                    "postnom": agent.postnom || "",
                    "email": agent.email || "",
                    "telephone": agent.telephone || "",
                    "adresse": agent.adresse || "",
                    "agence de référence": agent.agence?.code || "",
                    "role": agent.role?.code || "",
                    "ajout par": agent.creator || "",
                    "date d'ajout": agent?.dateCreation
                        ? DateTime.fromMillis(Number(agence.dateCreation)).setLocale('fr').toLocaleString(DateTime.DATETIME_MED)
                        : "N/A",
                    "date de modification": agent.dateDerniereModification
                        ? DateTime.fromMillis(Number(agence.dateDerniereModification)).setLocale('fr').toLocaleString(DateTime.DATETIME_MED)
                        : "N/A"
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