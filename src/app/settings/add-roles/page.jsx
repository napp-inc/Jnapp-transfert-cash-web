"use client";
import AddRoleForm from "../../../components/organisms/AddRoleForm";
import Menu from "../../../components/organisms/MenuDashbord";

export default function Home() {
    return (
        <div className="flex flex-col sm:flex-row gap-0 bg-gray-100">
            <Menu />
            <AddRoleForm />
        </div>
    );
}
