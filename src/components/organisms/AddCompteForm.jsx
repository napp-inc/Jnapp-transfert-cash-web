import React from "react";
import AddCompteFormFields from "../molecules/AddCompteFormFields";

export default function AddCompteForm() {
    return (
        <div className="sm:w-4/5 w-5/5 bg-white flex justify-center items-center h-fit sm:bg-gray-100 sm:p-12 min-h-screen">
            <AddCompteFormFields />
        </div>
    );
}