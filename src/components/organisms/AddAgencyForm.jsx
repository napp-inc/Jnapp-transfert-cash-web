import React from "react";
import AddAgencyFormFields from "../molecules/AddAgencyFormFields";

export default function AddAgency() {
    return (
        <div className="sm:w-4/5 w-5/5 bg-gray-100 py-10 pl-10 h-screen justify-center items-center">
            <AddAgencyFormFields />
        </div>
    );
}