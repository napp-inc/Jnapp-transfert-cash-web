import { useState, useEffect } from "react";
import { getAllAgentsRoute } from "../endPointsAndKeys";

const Agents = () => {
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
                const response = await fetch(getAllAgentsRoute, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Problème de connexion au serveur");
                }
                const result = await response.json();

                const agentsArray = Array.isArray(result)
                    ? result
                    : typeof result === "object" && result !== null
                        ? [result]
                        : [];
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
                    "date d'ajout": agent.dateCreation || "",
                    "date de modification": agent.dateDerniereModification || "",
                }));

                setData(formattedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    console.log(data);
    return { data, loading, error };
};

export default Agents;