'use client';
import DataTable from 'react-data-table-component';
import TransfertsInProgress from '../../hooks/Transferts';

import customStyles from '../atoms/CustomStylesTables';
import columns from '../atoms/TablesColums';

//import Link from 'next/link';
import Heading  from '../atoms/Heading';
import getAllVehicles from '../../endPointsAndKeys';


export default function TransfertsDashboard({ apiUrl = "api/url" }) {
    const { data, loading, error } = TransfertsInProgress(apiUrl);

    return (
        <div className="bg-gray-100 p-4 w-[100%] items-center">
            <Heading level="h2" children="Transferts" className="text-black-xl font-bold mb-4 title-size" />

            <div className="transferts-table overflow-auto hide-scrollbar">
                {error ? (
                    <div className="px-4 py-8 text-center">⚠️ {error}</div>
                ) : (
                    <DataTable
                        columns={columns(['Marque', 'Modèle', 'Immatriculation', 'Ajouté par', "Date d'ajout", 'Status'])}
                        data={data}
                        progressPending={loading}
                        progressComponent={<div className="px-4 py-8 text-center">Chargement...</div>}
                        noDataComponent={<div className="px-4 py-8 text-center">Aucun transfert trouvé</div>}
                        customStyles={customStyles}
                        highlightOnHover
                        pointerOnHover
                    />
                )}
            </div>
        </div>
    );
}
