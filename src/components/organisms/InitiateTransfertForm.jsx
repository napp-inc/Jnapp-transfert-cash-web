import React from "react";
import InitiateTransfert from "../../components/molecules/InitiateTransfertFormFields";

export default function InitiateAgentForm() {
    return (
        <div className="sm:w-4/5 w-5/5 bg-gray-100 py-10 pl-10 h-fit justify-center items-center">
            <InitiateTransfert />
        </div>
    );
}