"use client";

import RegisterForm from "../../components/molecules/Register";

export default function Home() {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center pt-24 pb-24">
            <RegisterForm />
        </div>
    );
}