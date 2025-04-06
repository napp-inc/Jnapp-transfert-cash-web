'use client';
import React, { useEffect, useState } from 'react';
import PreviewItems from '../atoms/PreviewItem';
import Heading from '../atoms/Heading';
import Transferts from '../../hooks/Transferts';

export default function Preview() {
    // Initialize state with default numeric values
    const [nombres, setNombres] = useState({
        transfertsEnCours: 0,
        transfertsTermines: 0,
        alertesEnCours: 0,
        transfertsPrevus: 0,
    });

    // Fetch data using the Transferts hook
    const { data, loading, error } = Transferts();

    useEffect(() => {
        if (!loading && !error && data && Array.isArray(data)) {
            // Calculate the number of transfers in each status
            const transfertsEnCours = data.filter(item => item.status === "EN COURS").length;
            const transfertsTermines = data.filter(item => item.status === "TERMINE").length;
            const transfertsPrevus =
                data.filter(item => item.status === "EN ATTENTE DE VERIFICATION").length +
                data.filter(item => item.status === "EN ATTENTE DE VALIDATION").length;

            // Calculate the total number of alerts for transfers in "EN COURS" status
            const alertesEnCours = data
                .filter(item => item.Status === "EN COURS")
                .reduce((totalAlerts, item) => totalAlerts + item.alertes.length, 0);

            // Update state with calculated values
            setNombres({
                transfertsEnCours,
                transfertsTermines,
                alertesEnCours,
                transfertsPrevus,
            });
        }
    }, [data, loading, error]);

    return (
        <div className="bg-gray-100 p-4 w-[100%] items-center">
            <Heading
                level="h2"
                children="Aperçu"
                className="text-black-xl font-bold mb-4 title-size"
            />

            {/* Loading Indicator */}
            {loading && (
                <div className="px-4 py-8 text-center">
                    Chargement en cours...
                </div>
            )}

            {/* Error Handling */}
            {error && (
                <div className="px-4 py-8 text-center text-red-500">
                    ⚠️ Erreur: {error}
                </div>
            )}

            {/* Display Counts */}
            {!loading && !error && (
                <div className="preview">
                    {/* Display Transferts en cours */}
                    <PreviewItems
                        src="/previewIcones/transferts.svg"
                        alt="Transferts en cours"
                        name="Transferts en cours"
                        count={`${nombres.transfertsEnCours}`} // Convert to string if needed
                        style={'sm:text-2xl text-xs text-blue-500 font-bold'}
                    />

                    {/* Display Transferts terminés */}
                    <PreviewItems
                        src="/previewIcones/finished.svg"
                        alt="Transferts terminés"
                        name="Transferts terminés"
                        count={`${nombres.transfertsTermines}`}
                        style={'sm:text-2xl text-xs text-blue-500 font-bold'}
                    />

                    {/* Display Alertes en cours */}
                    <PreviewItems
                        src="/previewIcones/alerts.svg"
                        alt="Alertes en cours"
                        name="Alertes en cours"
                        count={`${nombres.alertesEnCours}`}
                        style={'sm:text-2xl text-xs text-red-500 font-bold'}
                    />

                    {/* Display Transferts prévus */}
                    <PreviewItems
                        src="/previewIcones/scheduled.svg"
                        alt="Transferts prévus"
                        name="Transferts prévus"
                        count={`${nombres.transfertsPrevus}`}
                        style={'sm:text-2xl text-xs text-yellow-500 font-bold'}
                    />
                </div>
            )}
        </div>
    );
}