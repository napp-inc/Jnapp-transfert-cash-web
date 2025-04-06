"use client";
import DataTable from "react-data-table-component";
import Agents from "../../hooks/Agents"; // Assuming you have a hook for fetching agents
import customStyles from "../atoms/CustomStylesTables";
import columns from "../atoms/TablesColums";
import Heading from "../atoms/Heading";

export default function AgentList() {
    const { data, loading, error } = Agents();

    // Define the table columns
    const tableColumns = columns([
        "Nom",
        "Postnom",
        "Prenom",
        "Email",
        "Telephone",
        "Agence",
        "Role",
        "Ajouté par",
        "Ajouté le"
    ]);

    // Format the data for display
    const formattedData = data.map(item => ({
        ...item,
        "Numéro de téléphone": item.telephone || "Inconnu",
        "Agence": item.referenceAgence || "Inconnu", // Display referenceAgence as Agence code
        "Role": item.referenceRole || "Inconnu",     // Display referenceRole as Role code
        "Ajouté par": item.creator || "Inconnu",
        "Ajouté le": new Date(item.dateCreation).toLocaleDateString("fr-FR")
    }));

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
                            data={formattedData} // Use the formatted data
                            progressPending={loading}
                            progressComponent={
                                <div className="px-4 py-8 text-center">
                                    Chargement en cours...
                                </div>
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