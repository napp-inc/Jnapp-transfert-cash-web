import React from "react";
import AddOrganisationFormFields from "../molecules/AddOrganisationFormFields";

export default function AddOrganisation() {
    return (
        <div className="sm:w-4/5 w-5/5 bg-gray-100 py-10 pl-10 h-fit justify-center items-center">
            <AddOrganisationFormFields />
        </div>
    );
}