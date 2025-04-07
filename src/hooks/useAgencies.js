import axios from 'axios';
import { backendAgencies } from '../endPointsAndKeys';
import { useState, useEffect } from 'react';

export default function useAgencies() {
    const defaultStatic = [{ id: 1, name: 'AGENCE PAR DÉFAUT', lat: 0, lng: 0 }];

    // État pour stocker les données des agences
    const [agencies, setAgencies] = useState(defaultStatic);
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs

    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                const response = await axios.get(backendAgencies);

                const transformedData = response.data.agences?.map((agence, index) => ({
                    id: index + 1, // ID séquentiel
                    name: agence.name,
                    lat: agence.latitude,
                    lng: agence.longitude,
                }));

                setAgencies(transformedData || []);
            } catch (err) {
                console.error('Erreur lors de la récupération des agences:', err);
                setError(err); // Stocker l'erreur
                setAgencies(defaultStatic); // Fallback aux données par défaut
            } finally {
                setLoading(false); // Marquer le chargement comme terminé
            }
        };

        fetchAgencies();
    }, []);

    return { agencies, loading, error };
};
