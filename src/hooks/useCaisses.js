import { useState, useEffect } from "react";
import axios from "axios";
import { getCaisseRoute } from "../endPointsAndKeys";

export default function useCaisse() {
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
                const response = await axios.get(getCaisseRoute, {
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
                    designation: caisse?.designation || "",
                    devise: caisse?.devise || "",
                    agence: caisse?.agence || "",
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