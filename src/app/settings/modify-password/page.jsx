"use client";

import ChangePasswordForm from "../../../components/organisms/ChangePasswordForm";
import ProtectedRoute from '../../../contexts/protectedRoute';

export default function Home() {
    return (
        <ProtectedRoute>
            <ChangePasswordForm />
        </ProtectedRoute>
    );
}