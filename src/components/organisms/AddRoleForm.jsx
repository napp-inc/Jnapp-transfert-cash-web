import React from "react";
import AddRoleFormFields from "../molecules/AddRoleFormFields"

export default function AddRoleForm() {
    return (
        <div className="sm:w-4/5 w-5/5 bg-gray-100 py-10 h-screen justify-center items-center">
            <AddRoleFormFields/>
        </div>
    );
}