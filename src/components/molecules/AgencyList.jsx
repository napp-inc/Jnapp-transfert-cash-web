'use client';
import DataTable from 'react-data-table-component';
import useAgences from '../../hooks/useAgences';
import customStyles from '../atoms/CustomStylesTables';
import columns from '../atoms/TablesColums';
import Heading from '../atoms/Heading';

export default function AgencesList() {
    const { data, loading, error } = useAgences();

    // Define the columns you want to display
    const tableColumns = columns([
        'Code',
        'Designation',
        'Adresse',
        'Date d\'ajout',
        'Date de Modification'
    ]);

    return (
        <div className="bg-gray-100 p-4 w-full">
            <Heading
                level="h2"
                children="Agences"
                className="text-black-xl font-bold mb-4 title-size"
            />

            <div className="agences-table overflow-auto hide-scrollbar">
                {error ? (
                    <div className="px-4 py-8 text-center text-red-500">
                        ⚠️ Erreur: {error}
                    </div>
                ) : (
                    <DataTable
                        columns={tableColumns}
                        data={data}
                        progressPending={loading}
                        progressComponent={
                            <div class="loader"></div>
                        }
                        noDataComponent={
                            <div className="px-4 py-8 text-center">
                                {loading ? '' : 'Aucune agence trouvée'}
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