'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import React from "react";

// PreviewItems Component
const PreviewItems = ({ src, alt, name, count }) => {
    return (
        <div className="bg-white shadow rounded p-4 flex flex-col items-center justify-center space-y-2">
            <img src={src} alt={alt} className="w-8 h-8" />
            <p className="text-blue-500 font-semibold">{name}</p>  
            <p className="text-blue-500 font-bold">{count}</p>
        </div>
    );
};

// Preview Component
export default function Preview() {
    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-red-2xl font-bold mb-4">Aperçu</h2>
            <div className="flex overflow-x-auto space-x-4">
                <PreviewItems
                    src="/dashboardIconeActive.svg"
                    alt="Transferts en cours"
                    name="Transferts en cours"
                    count="15"
                />

                <PreviewItems
                    src="/dashboardIconeActive.svg"
                    alt="Transferts terminés"
                    name="Transferts terminés"
                    count="5"
                    className="text-green-500"
                />

                <PreviewItems
                    src="/dashboardIconeActive.svg"
                    alt="Alertes en cours"
                    name="Alertes en cours"
                    count="4"
                    className="text-red-500"
                />

                <PreviewItems
                    src="/dashboardIconeActive.svg"
                    alt="Transferts prévus"
                    name="Transferts prévus"
                    count="15"
                    className="text-yellow-500"
                />
            </div>
        </div>
    );
}