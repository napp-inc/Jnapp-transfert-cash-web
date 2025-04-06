"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    InfoWindow,
    useJsApiLoader,
} from "@react-google-maps/api";
import { apiKeyGoogleMaps } from "../endPointsAndKeys";
import useAgencies from "../hooks/useAgencies";
import useMobileUnits from "../hooks/useMobileUnits";

export default function MapComponent() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKeyGoogleMaps,
        libraries: ["places"],
        authReferrerPolicy: "origin",
        loadingTimeout: 15000,
    });

    const [selectedUnit, setSelectedUnit] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [filters, setFilters] = useState({
        showStops: true,
        showAgencies: true,
    });

    const agencies = useAgencies();
    const { mobileUnits, alerts, directions, etas, updateMobileUnits } =
        useMobileUnits(isLoaded);
    const defaultCenter = { lat: -4.389892, lng: 15.313868 };

    // Position validation helper
    const safePosition = (position) => {
        if (!position) return defaultCenter;
        const lat = Number(position.lat);
        const lng = Number(position.lng);
        return (!isNaN(lat) && !isNaN(lng) &&
            lat >= -90 && lat <= 90 &&
            lng >= -180 && lng <= 180)
            ? { lat, lng }
            : defaultCenter;
    };

    // Debug logging for invalid positions
    useEffect(() => {
        const validateData = () => {
            agencies.forEach((agency) => {
                const lat = Number(agency.lat);
                const lng = Number(agency.lng);
                if (isNaN(lat) || isNaN(lng)) {
                    console.error("Invalid agency position:", agency);
                }
            });

            mobileUnits.forEach((unit) => {
                if (unit.position) {
                    const lat = Number(unit.position.lat);
                    const lng = Number(unit.position.lng);
                    if (isNaN(lat) || isNaN(lng)) {
                        console.error("Invalid mobile unit position:", unit);
                    }
                }
            });
        };

        validateData();
    }, [agencies, mobileUnits]);

    // Real-time updates
    useEffect(() => {
        if (isLoaded) {
            const interval = setInterval(updateMobileUnits, 15000);
            return () => clearInterval(interval);
        }
    }, [isLoaded, updateMobileUnits]);

    // Map bounds adjustment
    const fitBounds = useCallback(() => {
        if (mapInstance) {
            const bounds = new window.google.maps.LatLngBounds();
            agencies
                .filter((a) => typeof a.lat === "number" && typeof a.lng === "number")
                .forEach((a) => bounds.extend(safePosition(a)));

            mobileUnits
                .filter((u) => u.position)
                .forEach((u) => bounds.extend(safePosition(u.position)));

            if (!bounds.isEmpty()) {
                mapInstance.fitBounds(bounds);
            }
        }
    }, [mapInstance, agencies, mobileUnits]);

    useEffect(() => {
        if (mapInstance) fitBounds();
    }, [mapInstance, fitBounds]);

    const handleMarkerClick = (unit) => {
        setSelectedUnit(unit);
        if (mapInstance && unit.position) {
            mapInstance.panTo(safePosition(unit.position));
        }
    };

    if (loadError) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-red-500 mb-4">
                    Erreur de chargement de la carte: {loadError.message}
                </p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => window.location.reload()}
                >
                    Réessayer
                </button>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                <p className="ml-4 text-lg">Chargement de la carte...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 p-4 w-full h-screen">
            <div className="mb-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() =>
                        setFilters({ ...filters, showAgencies: !filters.showAgencies })
                    }
                >
                    {filters.showAgencies ? "Masquer" : "Afficher"} Agences
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() =>
                        setFilters({ ...filters, showStops: !filters.showStops })
                    }
                >
                    {filters.showStops ? "Masquer" : "Afficher"} Arrêts
                </button>
            </div>

            <GoogleMap
                mapContainerStyle={{ height: "85vh", width: "100%" }}
                center={defaultCenter}
                zoom={15}
                onLoad={(map) => setMapInstance(map)}
                options={{
                    mapTypeControl: false,
                    streetViewControl: false,
                }}
            >
                {/* Agencies Markers */}
                {filters.showAgencies &&
                    agencies
                        .filter(
                            (agency) =>
                                typeof agency.lat === "number" &&
                                typeof agency.lng === "number"
                        )
                        .map((agency) => (
                            <Marker
                                key={agency.id}
                                position={safePosition(agency)}
                                icon={{
                                    url: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png",
                                    scaledSize: new window.google.maps.Size(40, 40),
                                }}
                                onClick={() => handleMarkerClick(agency)}
                            />
                        ))}

                {/* Mobile Units */}
                {mobileUnits
                    .filter(
                        (unit) =>
                            (filters.showStops || !alerts[unit.id]) &&
                            unit.position &&
                            typeof unit.position.lat === "number" &&
                            typeof unit.position.lng === "number"
                    )
                    .map((unit) => (
                        <React.Fragment key={unit.id}>
                            {/* Directions Renderer */}
                            {directions[unit.id] && (
                                <DirectionsRenderer
                                    directions={directions[unit.id]}
                                    options={{
                                        polylineOptions: {
                                            strokeColor: "#FFA500",
                                            strokeWeight: 4,
                                            strokeOpacity: 0.8,
                                        },
                                        suppressMarkers: true,
                                    }}
                                />
                            )}

                            {/* Unit Marker */}
                            <Marker
                                position={safePosition(unit.position)}
                                icon={{
                                    url: alerts[unit.id]
                                        ? "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png"
                                        : "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-yellow.png",
                                    scaledSize: new window.google.maps.Size(35, 35),
                                }}
                                label={{
                                    text: `${Math.round(etas[unit.id] / 60)} min`,
                                    className: "eta-label bg-white rounded px-2 py-1 text-black",
                                }}
                                onClick={() => handleMarkerClick(unit)}
                            />
                        </React.Fragment>
                    ))}

                {/* InfoWindow */}
                {selectedUnit && selectedUnit.position && (
                    <InfoWindow
                        position={safePosition(selectedUnit.position)}
                        onCloseClick={() => setSelectedUnit(null)}
                    >
                        <div className="max-w-xs">
                            <h3 className="font-bold mb-2">
                                {selectedUnit.name || "Unité Mobile"}
                            </h3>
                            <p>ID: {selectedUnit.id}</p>
                            <p>Chargé de mission: {selectedUnit.missionManager}</p>
                            <p>Montant: {selectedUnit.amount} FCFA</p>
                            {alerts[selectedUnit.id] && (
                                <p className="text-red-500">ALERTE: {alerts[selectedUnit.id]}</p>
                            )}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}