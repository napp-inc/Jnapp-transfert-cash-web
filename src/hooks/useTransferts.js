import { useState, useEffect } from "react";
import axios from "axios";
import { allTransfertsRoute } from "../endPointsAndKeys"

export default function useTransfert ()  {
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
				
                const response = await axios.get(allTransfertsRoute, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

				if (!response.ok) {
					throw new Error("Problème de connexion au serveur");
				};
				const result = await response.json();
				console.log(result);

				// If the API returns an array of transfer objects
				if (Array.isArray(result)) {
					setData(result);
				}
				// If the API returns a single transfer object
				else if (typeof result === 'object' && result !== null) {
					setData([result]); // Wrap single object in an array
				}
				else {
					throw new Error('Format de données non reconnu');
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []); // Empty dependency array ensures this runs only once

	return { data, loading, error };
};
