import { useState, useEffect } from "react";
import { getAllAgenciesRoute } from "../endPointsAndKeys";

export default function useAgences(){
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
                    throw new Error("Problème de connexion au serveur");
                }

                const result = await response.json();
                console.log(result);

                const agencesArray = result.agences || [];

                let datas = [];

                if (agencesArray.length > 0) {
                    agencesArray.forEach((element) => {
                        datas.push({
                            "code": element.code || "",
                            "designation": element.designation || "",
                            "adresse": element.adresse || "",
                            "ajout par": element.creator || "",
                            "date d'ajout": element.dateCreation || "",
                            "date de modification": element.dateDerniereModification || "",
                        });
                    });
                    
                };
                console.log(datas);
                setData(datas);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};
