"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    InfoWindow,
    useJsApiLoader,
} from "@react-google-maps/api";
import { apiKeyGoogleMaps } from "../../endPointsAndKeys";
import useAgencies from "../../hooks/useAgencies";
import useMobileUnits from "../../hooks/useMobileUnits";

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

    // Real-time updates
    useEffect(() => {
        if (isLoaded) {
            const interval = setInterval(() => {
                updateMobileUnits();
            }, 15000); // 15s updates
            return () => clearInterval(interval);
        }
    }, [isLoaded, updateMobileUnits]);

    // Map bounds adjustment
    const fitBounds = useCallback(() => {
        if (mapInstance && mobileUnits.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            mobileUnits.forEach((unit) =>
                bounds.extend(new window.google.maps.LatLng(unit.position))
            );
            agencies.forEach((agency) =>
                bounds.extend(new window.google.maps.LatLng(agency.lat, agency.lng))
            );
            mapInstance.fitBounds(bounds);
        }
    }, [mapInstance, mobileUnits, agencies]);

    useEffect(() => {
        if (mapInstance) fitBounds();
    }, [mapInstance, mobileUnits, agencies, fitBounds]);

    const handleMarkerClick = (unit) => {
        setSelectedUnit(unit);
        if (mapInstance) {
            mapInstance.panTo(unit.position);
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
                <div class="loader"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 p-4 w-full h-screen">
            <div className="mb-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => setFilters({ ...filters, showAgencies: !filters.showAgencies })}
                >
                    {filters.showAgencies ? "Masquer" : "Afficher"} Agences
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setFilters({ ...filters, showStops: !filters.showStops })}
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
                    agencies.map((agency) => (
                        <Marker
                            key={agency.id}
                            position={{ lat: agency.lat, lng: agency.lng }}
                            icon={{
                                url: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png",
                                scaledSize: new window.google.maps.Size(40, 40),
                            }}
                            onClick={() => handleMarkerClick(agency)}
                        />
                    ))}

                {/* Mobile Units */}
                {mobileUnits
                    .filter((unit) => filters.showStops || !alerts[unit.id])
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
                                position={unit.position}
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
                {selectedUnit && (
                    <InfoWindow
                        position={selectedUnit.position}
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