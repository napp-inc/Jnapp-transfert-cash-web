'use client';
import DataTable from 'react-data-table-component';
import useCompte from '../../hooks/useComptes';
import customStyles from '../atoms/CustomStylesTables';
import columns from '../atoms/TablesColums';
import Heading from '../atoms/Heading';

export default function CompteList() {
    const { data, loading, error } = useCompte();

    // Define the columns you want to display
    const tableColumns = columns([
        'Numero',
        'Devise',
        'Banque',
        'Solde',
        'Gestionnaire'
    ]);

    return (
        <div className="bg-gray-100 p-4 w-full">
            <Heading
                level="h2"
                children="Comptes bancaires"
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
                            <div className="loader"></div>
                        }
                        noDataComponent={
                            <div className="px-4 py-8 text-center">
                                {loading ? '' : 'Aucun compte trouvée'}
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