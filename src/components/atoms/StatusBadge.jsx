"use client";
import React from 'react';


export default function StatusBadge({ status }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'EN ATTENTE DE VERIFICATION': return 'bg-yellow-200 text-yellow-800';
            case 'EN ATTENTE DE VALIDATION': return 'bg-blue-200 text-blue-800';
            case 'EN COURS': return 'bg-green-200 text-green-800';
            case 'ANNULE': return 'bg-red-200 text-red-800';
            case 'TERMINE': return 'bg-purple-200 text-purple-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(status)}`}>
            {status.replace(/_/g, ' ').toLowerCase()}
        </span>
    );
};