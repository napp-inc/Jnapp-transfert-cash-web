import axios from 'axios'; // Import Axios pour les requêtes HTTP
import { apiBackendRoute } from '../endPointsAndKeys';
import { useState, useEffect } from 'react';
export default function useMobileUnits() {
    const [mobileUnits, setMobileUnits] = useState([]); // Liste des véhicules
    const [alerts, setAlerts] = useState({}); // Alertes pour les véhicules immobilisés
    const [directions, setDirections] = useState({}); // Données de directions
    const [etas, setEtas] = useState({}); // Temps d'arrivée estimé (ETA)

    useEffect(() => {
        let intervalId;

        const fetchPositions = async () => {
            try {
                const response = await axios.get(apiBackendRoute);
                const updatedPositions = response.data;

                // Mettre à jour les positions des véhicules
                setMobileUnits((prevUnits) =>
                    prevUnits.map((unit) => {
                        const updatedUnit = updatedPositions.find((pos) => pos.id === unit.id);
                        return updatedUnit ? { ...unit, ...updatedUnit } : unit;
                    })
                );

                // Générer des alertes pour les véhicules immobilisés
                const newAlerts = {};
                updatedPositions.forEach((unit) => {
                    if (unit.speed < 5 && Date.now() - unit.lastMove > 300000) {
                        newAlerts[unit.id] = `ALERTE : ${unit.name} immobilisé`;
                    }
                });
                setAlerts(newAlerts);
            } catch (error) {
                console.error('Erreur lors de la récupération des positions:', error);
            }
        };

        fetchPositions();
        intervalId = setInterval(fetchPositions, 10000); // 10 secondes

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // Calcul des itinéraires et des temps d'arrivée estimés (ETA)
    useEffect(() => {
        if (!window.google?.maps?.DirectionsService) return;

        const fetchRoute = async (unit) => {
            try {
                const directionsService = new window.google.maps.DirectionsService();
                const result = await directionsService.route({
                    origin: new window.google.maps.LatLng(unit.path[0].lat, unit.path[0].lng),
                    destination: new window.google.maps.LatLng(unit.path[unit.path.length - 1].lat, unit.path[unit.path.length - 1].lng),
                    travelMode: 'DRIVING',
                    drivingOptions: {
                        departureTime: new Date(),
                        trafficModel: 'bestguess',
                    },
                });

                setDirections((prev) => ({ ...prev, [unit.id]: result }));
                setEtas((prev) => ({
                    ...prev,
                    [unit.id]: result.routes[0].legs[0].duration_in_traffic.value,
                }));
            } catch (error) {
                console.error('Erreur Directions API:', error);
            }
        };

        mobileUnits.forEach((unit) => fetchRoute(unit));
    }, [mobileUnits]);

    return { mobileUnits, alerts, directions, etas };
};
