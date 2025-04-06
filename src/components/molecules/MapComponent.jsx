"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    InfoWindow,
} from "@react-google-maps/api";
import { apiKeyGoogleMaps } from "../endPointsAndKeys";
import useAgencies from "../hooks/useAgencies";
import useMobileUnits from "../hooks/useMobileUnits";

const defaultCenter = { lat: -4.389892, lng: 15.313868 };

const MapComponent = () => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKeyGoogleMaps,
        libraries: ["places"],
        authReferrerPolicy: "origin",
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

    // Enhanced position validation
    const safePosition = (obj) => {
        if (!obj) return defaultCenter;

        const lat = Number(obj.lat ?? obj.position?.lat);
        const lng = Number(obj.lng ?? obj.position?.lng);

        const isValid = (
            !isNaN(lat) &&
            !isNaN(lng) &&
            lat >= -90 && lat <= 90 &&
            lng >= -180 && lng <= 180
        );

        return isValid ? { lat, lng } : defaultCenter;
    };

    // Data validation effect
    useEffect(() => {
        const validateData = () => {
            agencies.forEach((agency) => {
                const pos = safePosition(agency);
                if (pos === defaultCenter) {
                    console.warn("Invalid agency position:", agency);
                }
            });

            mobileUnits.forEach((unit) => {
                const pos = safePosition(unit);
                if (pos === defaultCenter) {
                    console.warn("Invalid mobile unit position:", unit);
                }
            });
        };

        validateData();
    }, [agencies, mobileUnits]);

    // Map bounds adjustment
    const fitBounds = useCallback(() => {
        if (!mapInstance) return;

        const bounds = new google.maps.LatLngBounds();
        const validAgencies = agencies.filter((a) =>
            typeof a.lat === "number" && typeof a.lng === "number"
        );

        const validUnits = mobileUnits.filter((u) =>
            u.position &&
            typeof u.position.lat === "number" &&
            typeof u.position.lng === "number"
        );

        [...validAgencies, ...validUnits].forEach((item) => {
            const position = safePosition(item);
            bounds.extend(new google.maps.LatLng(position));
        });

        if (!bounds.isEmpty()) {
            mapInstance.fitBounds(bounds);
        }
    }, [mapInstance, agencies, mobileUnits]);

    useEffect(() => {
        if (mapInstance) fitBounds();
    }, [mapInstance, fitBounds]);

    const handleMarkerClick = (unit) => {
        setSelectedUnit(unit);
        const position = safePosition(unit);
        mapInstance?.panTo(position);
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
                    onClick={() => setFilters((prev) => ({
                        ...prev,
                        showAgencies: !prev.showAgencies,
                    }))}
                >
                    {filters.showAgencies ? "Masquer" : "Afficher"} Agences
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setFilters((prev) => ({
                        ...prev,
                        showStops: !prev.showStops,
                    }))}
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
                        .filter((a) => typeof a.lat === "number" && typeof a.lng === "number")
                        .map((agency) => (
                            <Marker
                                key={agency.id}
                                position={safePosition(agency)}
                                icon={{
                                    url: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png",
                                    scaledSize: new google.maps.Size(40, 40),
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
                            {directions[unit.id]?.routes && (
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
                                position={safePosition(unit)}
                                icon={{
                                    url: alerts[unit.id]
                                        ? "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png"
                                        : "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-yellow.png",
                                    scaledSize: new google.maps.Size(35, 35),
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
                {selectedUnit && (
                    <InfoWindow
                        position={safePosition(selectedUnit)}
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
};

export default MapComponent;