import React from "react";
import AddVehicleFields from "../molecules/AddVehicleFormFields";

export default function AddVehicle() {
    return (
        <div className="sm:w-4/5 w-5/5 bg-gray-100 py-10 h-screen justify-center items-center">
            <AddVehicleFields />
        </div>
    );
}