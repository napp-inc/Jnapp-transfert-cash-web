"use client";
import DataTable from "react-data-table-component";
import useVehicule from "../../hooks/useVehicules"; // Correction : Nom du hook sans "s"
import customStyles from "../atoms/CustomStylesTables";
import columns from "../atoms/TablesColums";
import Heading from "../atoms/Heading";

export default function VehicleList() {
    const { data, loading, error } = useVehicule();

    const tableColumns = columns([
        "Marque",
        "Modele",
        "Immatriculation",
        "Etat",
        "Date d'ajout",
    ]);

    return (
        <div className="sm:w-4/5 w-full bg-gray-100 py-10 pl-10 h-fit justify-center items-center min-h-screen">
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
                            data={data}
                            progressPending={loading}
                            progressComponent={
                                <div className="loader"></div>
                            }
                            noDataComponent={
                                <div className="px-4 py-8 text-center">
                                    {loading ? "" : "Aucun véhicule trouvé"} {/* Correction : Texte ajusté */}
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