import { useState, useEffect } from "react";
import axios from "axios";
import { getBanqueRoute } from "../endPointsAndKeys";

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

                const response = await axios.get(getBanqueRoute, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const banquesArray = response?.data?.Banques || [];
                console.log(banquesArray);

                const formattedBanques = banquesArray.map((banque, index) => ({
                    id: index + 1,
                    reference: banque?.id || "",
                    nom: banque?.designation || "",
                    adresse: banque?.devise || "",
                    email: banque?.agence || "",
                    telephone: banque?.solde || "",
                    "site web": banque?.gestionnaire || "",
                }));

                setData(formattedBanques);
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