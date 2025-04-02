import io from 'socket.io-client';
import { apiBackendRoute } from '../endPointsAndKeys';
import { useState, useEffect } from 'react';

const useMobileUnits = (isLoaded) => {
    const [mobileUnits, setMobileUnits] = useState([]);
    const [alerts, setAlerts] = useState({});
    const [isConnected, setIsConnected] = useState(true);
    const [directions, setDirections] = useState({});
    const [etas, setEtas] = useState({});

    useEffect(() => {
        if (!isLoaded) return;

        const socket = io(`${apiBackendRoute}`);
        socket.on('connect', () => {
            setIsConnected(true);
            socket.emit('get-mobile-units');
        });

        socket.on('mobile-data', (data) => {
            // Mettre à jour les vehicules avec les nouvelles données
            setMobileUnits(data);
            // Mettre à jour les alertes
            const newAlerts = {};
            data.forEach((unit) => {
                if (unit.speed < 5 && Date.now() - unit.lastMove > 300000) {
                    newAlerts[unit.id] = `ALERTE : ${unit.name} immobilisé`;
                }
            });
            setAlerts(newAlerts);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            // Réinitialiser les vehicules en cas de déconnexion
            setMobileUnits([]);
        });

        return () => {
            socket.disconnect();
        };
    }, [isLoaded]);

    useEffect(() => {
        if (!isLoaded || !isConnected) return;

        const fetchRoute = async (unit) => {
            try {
                if (!window.google?.maps?.DirectionsService) {
                    return;
                }

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
    }, [mobileUnits, isConnected, isLoaded]);

    return { mobileUnits, alerts, directions, etas };
};

export default useMobileUnits;