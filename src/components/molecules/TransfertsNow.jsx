'use client';
import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import Transferts from '../../hooks/Transferts';
import customStyles from '../atoms/CustomStylesTables';
import columns from '../atoms/TablesColums';
import Heading from '../atoms/Heading';

export default function TransfertsEnCours({ apiUrl = "api/url" }) {
    const { data, loading, error } = Transferts(apiUrl);

    const filteredData = useMemo(() => {
        if (!data) return [];
        return data.filter(item => item.etat === "EN COURS");
    }, [data]);

    return (
        <div className="bg-gray-100 p-4 w-full">
            <Heading level="h2" className="text-2xl font-bold mb-4">
                Transferts en Cours
            </Heading>

            <div className="transferts-table overflow-auto">
                {error ? (
                    <DataTable
                    columns={columns([
                        'Transfert',
                        'Date',
                        'Chargé',
                        'Validateur',
                        'Véhicule',
                        'Sac',
                        'Trajet',
                        'Alertes',
                        'Montant',
                        'Status'
                    ])}
                    data={filteredData}
                    progressPending={loading}
                    progressComponent={<div className="p-4">Chargement...</div>}
                    noDataComponent={<div className="p-4">Aucun transfert en cours</div>}
                    customStyles={customStyles}
                    highlightOnHover
                    pointerOnHover
                    pagination // Activation de la pagination
                    paginationPerPage={20} // 20 éléments par page
                    paginationRowsPerPageOptions={[20, 50, 100]} // Options de pagination
                    responsive
                />
                ) : (
                    <DataTable
                        columns={columns([
                            'Transfert',
                            'Date',
                            'Chargé',
                            'Validateur',
                            'Véhicule',
                            'Sac',
                            'Trajet',
                            'Alertes',
                            'Montant',
                            'Status'
                        ])}
                        data={filteredData}
                        progressPending={loading}
                        progressComponent={<div className="p-4">Chargement...</div>}
                        noDataComponent={<div className="p-4">Aucun transfert en cours</div>}
                        customStyles={customStyles}
                        highlightOnHover
                        pointerOnHover
                        pagination // Activation de la pagination
                        paginationPerPage={20} // 20 éléments par page
                        paginationRowsPerPageOptions={[20, 50, 100]} // Options de pagination
                        responsive
                    />
                )}
            </div>
        </div>
    );
}