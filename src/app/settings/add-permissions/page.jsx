"use client";
import AddPermissionForm from "../../../components/organisms/AddPermissionForm";
import Menu from "../../../components/organisms/MenuDashbord";

export default function Home() {
    return (
        <div className="flex flex-col sm:flex-row gap-0 bg-gray-100">
            <Menu />
            <AddPermissionForm />
        </div>
    );
}
