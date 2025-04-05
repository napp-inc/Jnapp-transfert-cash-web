import React from "react";
import AddAgentFormFields from "../molecules/AddAgentFormFields";

export default function AddAgentForm() {
    return (
        <div className="sm:w-4/5 w-5/5 bg-gray-100 py-10 h-fit justify-center items-center">
            <AddAgentFormFields />
        </div>
    );
}