'use client';
import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { apiKeyGoogleMaps } from '../endPointsAndKeys';
import useAgencies from '../hooks/useAgencies';
import useMobileUnits from '../hooks/useMobileUnits';



export default function MapComponent() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKeyGoogleMaps,
        libraries: ['places'],
        authReferrerPolicy: 'origin',
        loadingTimeout: 15000,
    });

    useEffect(() => {
        if (loadError) {
            console.error('Erreur de chargement Google Maps:', loadError);
        }
    }, [loadError]);

    const [filters, setFilters] = useState({
        showStops: true,
    });

    const agencies = useAgencies();
    const { mobileUnits, alerts, directions, etas } = useMobileUnits(isLoaded);
    const defaultCenter = { lat: -4.389892, lng: 15.313868 };

    if (loadError) {
        return (
            <div>
                <p>Erreur de chargement de la carte</p>
                <button onClick={() => window.location.reload()}>Réessayer</button>
            </div>
        );
    }

    if (!isLoaded) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="bg-gray-100 p-4 w-[100%] items-center">
            <h2 className="text-black-xl font-bold mb-4 title-size">Carte</h2>

            <GoogleMap mapContainerStyle={{ height: '70vh', width: '70vw' }} center={defaultCenter} zoom={15}>
                {agencies.map((agency) => (
                    <Marker
                        key={agency.id}
                        position={{ lat: agency.lat, lng: agency.lng }}
                        icon={{
                            url: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png',
                            scaledSize: new window.google.maps.Size(50, 50),
                        }}
                    />
                ))}

                {mobileUnits
                    .filter((unit) => {
                        if (!filters.showStops && alerts[unit.id]) return false;
                        return true;
                    })
                    .map((unit) => (
                        <React.Fragment key={unit.id}>
                            {directions[unit.id] && (
                                <DirectionsRenderer
                                    directions={directions[unit.id]}
                                    options={{
                                        polylineOptions: { strokeColor: '#FFA500', strokeWeight: 4 },
                                    }}
                                />
                            )}
                            <Marker
                                position={unit.position}
                                icon={{
                                    url: alerts[unit.id]
                                        ? 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png'
                                        : 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-yellow.png',
                                    scaledSize: new window.google.maps.Size(30, 30),
                                }}
                                label={{
                                    text: `${Math.round(etas[unit.id] / 60)} min`,
                                    className: 'eta-label',
                                }}
                            />
                        </React.Fragment>
                    ))}
            </GoogleMap>
        </div>
    );
}
