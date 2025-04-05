import React from "react";
import AddAgencyFormFields from "../molecules/AddAgencyFormFields";

export default function AddAgency() {
    return (
        <div className="sm:w-4/5 w-5/5 bg-white flex justify-center items-center h-screen sm:bg-gray-100">
            <AddAgencyFormFields />
        </div>
    );
}