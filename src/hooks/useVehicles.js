"use client"
import { useState, useEffect } from 'react';
import { getAllVehiclesRoute } from '../endPointsAndKeys';

const useVehicles = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch(getAllVehiclesRoute);
                if (!response.ok) throw new Error('Erreur de connexion');
                const vehicles = await response.json();
                setData(vehicles);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    return { data, loading, error };
};

export default useVehicles;