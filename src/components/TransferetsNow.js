'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PreviewItems = ({ src, alt, name, count }) => {
    return (
        <div>
            <img src={src} alt={alt} />
            <p>{name}</p>
            <p>{count}</p>
        </div>
    );
}

export default function TransfertsNow() {
    return (
        <div>
            <h2>Transferts en cours</h2>

            <div>
                <PreviewItems
                    src="/dashboardIconeActive.svg"
                    alt="Tableau de bord"
                    name="Transferts en cours"
                    count="15"
                />

                <PreviewItems
                    src="/dashboardIconeActive.svg"
                    alt="Tableau de bord"
                    name="Transferts terminés"
                    count="5"
                />

                <PreviewItems
                    src="/dashboardIconeActive.svg"
                    alt="Tableau de bord"
                    name="Alertes en cours"
                    count="15"
                />

                <PreviewItems
                    src="/dashboardIconeActive.svg"
                    alt="Tableau de bord"
                    name="Transferts prévus"
                    count="5"
                />
            </div>
        </div>
    );
}
