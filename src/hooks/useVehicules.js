import { useState, useEffect } from "react";
import { getAllVehiclesRoute } from "../endPointsAndKeys";

export default function useVehicle () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(getAllVehiclesRoute);

                if (!response.ok) {
                    throw new Error("Problème de connexion au serveur");
                }

                const result = await response.json();
                if (Array.isArray(result)) {
                    setData(result);
                }
                else if (typeof result === "object" && result !== null) {
                    setData([result]);
                } else {
                    throw new Error("Format de données non reconnu");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    return { data, loading, error };
};
