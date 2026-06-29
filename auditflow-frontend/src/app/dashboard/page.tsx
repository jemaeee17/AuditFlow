"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { logout } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const { user, loading, logout } = useAuth();

    const handleLogout = async () => {
        await logout();

        router.push("/login");
    };

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-slate-600">Loading...</p>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="rounded-xl bg-white p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-slate-900">
                    Dashboard
                </h1>

                {user && (
                    <div className="mt-6 space-y-2">
                        <p>
                            <strong>Name:</strong> {user.name}
                        </p>

                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="mt-6 rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </main>
    );
}