import React from "react";
import AddPermissionFormFields from "../molecules/AddPermissionFormFields"

export default function AddPermissionForm() {
    return (
        <div className="sm:w-4/5 w-5/5 bg-gray-100 py-10 pl-10 h-screen justify-center items-center">
            <AddPermissionFormFields/>
        </div>
    );
}