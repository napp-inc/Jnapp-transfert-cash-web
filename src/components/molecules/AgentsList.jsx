"use client";
import DataTable from "react-data-table-component";
import useAgent from "../../hooks/useAgents";
import customStyles from "../atoms/CustomStylesTables";
import columns from "../atoms/TablesColums";
import Heading from "../atoms/Heading";

export default function AgentList() {
    const { data, loading, error } = useAgent();

    // Define the table columns
    const tableColumns = columns([
        "Nom",
        "Postnom",
        "Prenom",
        "Email",
        "Telephone",
        "Photo",
        "Adresse",
        "Agence",
        "Role",
        "Date d'ajout",
        "Date de modification",
    ]);


    return (
        <div className="sm:w-4/5 w-5/5 bg-gray-100 py-10 pl-10 h-fit justify-center items-center min-h-screen">
            <div className="bg-gray-100 p-4 w-full">
                <Heading
                    level="h2"
                    children="Liste des agents"
                    className="px-4 mb-6 text-lg font-bold"
                />

                <div className="agents-table overflow-auto hide-scrollbar">
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
                                    {loading ? "" : "Aucun agent trouvé"}
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
        </div>
    );
}