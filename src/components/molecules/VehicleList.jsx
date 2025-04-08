"use client";
import DataTable from "react-data-table-component";
import useVehicule from "../../hooks/useVehicules";
import customStyles from "../atoms/CustomStylesTables";
import columns from "../atoms/TablesColums";
import Heading from "../atoms/Heading";

export default function VehicleList() {
    const { data, loading, error } = Vehicles();

    const tableColumns = columns([
        "Marque",
        "Modele",
        "Immatriculation",
        "Status",
        "Ajouté par",
        "Ajouté le"
    ]);

    const formattedData = data.map(item => ({
        ...item,
        "Status": item.status === "FREE" ? "Libre" : "Utilisé",
        "Ajouté par": item.creator || "Inconnu",
        "Ajouté le": new Date(item.dateAjout).toLocaleDateString("fr-FR")
    }));

    return (
        <div className="sm:w-4/5 w-5/5 bg-gray-100 py-10 pl-10 h-fit justify-center items-center min-h-screen">

            <div className="bg-gray-100 p-4 w-full">
                <Heading
                    level="h2"
                    children="Liste des véhicules"
                    className="px-4 mb-6 text-lg font-bold"
                />

                <div className="vehicles-table overflow-auto hide-scrollbar">
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
                                    {loading ? "" : "Aucun véhicule trouvé"}
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