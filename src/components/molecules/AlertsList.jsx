'use client';
import React from 'react';
import { Alerts } from '../../hooks/useAlerts';
import AlertItem from '../molecules/AlertItem';
import Heading from '../atoms/Heading';


export default function AlertsList() {
    const { alerts, isLoading, isError } = Alerts();

    return (
        <div className="bg-gray-100 p-4 w-[100%] items-center">
            <Heading level="h2" children="Alertes" className="text-black-xl font-bold mb-4 title-size" />

            <div className="container mx-auto p-4">
                {alerts.length === 0 ? (
                    <div className="text-center text-gray-500 py-4">Aucune alerte</div>
                ) : isError ?
                    <div className={`flex items-center p-4 mb-4 rounded-lg bg-gray-100`}>
                        <Heading level="h3" children="Problèmes de connexion"  className="font-bold text-black-200" />
                    </div>
                    : isLoading ?
                        <div className={`flex items-center p-4 mb-4 rounded-lg bg-gray-100`}>
                            <Heading level="h3" children="Chargement ..." className="font-bold text-black-200" />
                        </div>
                        :
                        (
                            alerts.map((alert, index) => <AlertItem key={index} type={alert.type} title={alert.title} timestamp={alert.timestamp} />)
                        )}
            </div>
        </div>
    );
}


