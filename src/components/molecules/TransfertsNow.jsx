//to edit because i don t have a transfert route

'use client';
import DataTable from 'react-data-table-component';
import useTransfert  from '../../hooks/useTransferts';
import customStyles from '../atoms/CustomStylesTables';
import columns from '../atoms/TablesColums';
import Heading from '../atoms/Heading';

export default function TransfertsDashboard() {
    const { data, loading, error } = useTransfert ();

    // Define the columns you want to display
    const tableColumns = columns([
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
    ]);

    // Filter data to include only "EN COURS" status
    const filteredData = data.filter(item => item.status === "EN COURS");

    // Format alertes data for display
    const formattedData = filteredData.map(item => ({
        ...item,
        Alertes: item.alertes.length > 0
            ? item.alertes.join(', ')
            : 'Aucune alerte'
    }));

    return (
        <div className="bg-gray-100 p-4 w-full">
            <Heading
                level="h2"
                children="Transferts"
                className="text-black-xl font-bold mb-4 title-size"
            />

            <div className="transferts-table overflow-auto hide-scrollbar">
                {error ? (
                    <div className="px-4 py-8 text-center text-red-500">
                        ⚠️ Erreur: {error}
                    </div>
                ) : (
                    <DataTable
                        columns={tableColumns}
                        data={formattedData} // Use the filtered and formatted data
                        progressPending={loading}
                        progressComponent={
                            <div class="loader"></div>
                        }
                        noDataComponent={
                            <div className="px-4 py-8 text-center">
                                {loading ? '' : 'Aucun transfert trouvé'}
                            </div>
                        }
                        customStyles={customStyles}
                        highlightOnHover
                        pointerOnHover
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                    />
                )}
            </div>
        </div>
    );
}