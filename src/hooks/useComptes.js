import { useState, useEffect } from "react";
import axios from "axios";
import { getCompteRoute } from "../endPointsAndKeys";

export default function useCompte() {
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