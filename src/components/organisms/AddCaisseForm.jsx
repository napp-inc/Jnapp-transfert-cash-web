import React from "react";
import AddCaisseFormFields from "../molecules/AddCaisseFormFields";

export default function AddCaisseForm() {
    return (
        <div className="sm:w-4/5 w-5/5 bg-white flex justify-center items-center h-fit sm:bg-gray-100 sm:p-12">
            <AddCaisseFormFields />
        </div>
    );
}