"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterFormData } from "@/lib/validations/auth";
import { useAuth } from "@/hooks/useAuth";

import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    const {
        register,
        user,
        loading: authLoading,
    } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        if (!authLoading && user) {
            router.replace("/dashboard");
        }
    }, [authLoading, user, router]);

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsSubmitting(true);
        setServerError("");

        try {
            await register(data);

            router.push("/dashboard");
        } catch (error: any) {
            setServerError(
                error.response?.data?.message ?? "Registration failed."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (authLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-slate-600">Loading...</p>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">

                <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
                    Create Account
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div>
                        <input
                            {...registerField("name")}
                            placeholder="Full Name"
                            className="w-full rounded-lg border border-gray-600 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <p className="text-sm text-red-500">
                            {errors.name?.message}
                        </p>
                    </div>

                    <div>
                        <input
                            {...registerField("email")}
                            placeholder="Email"
                            className="w-full rounded-lg border border-gray-600 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <p className="text-sm text-red-500">
                            {errors.email?.message}
                        </p>
                    </div>

                    <div>
                        <input
                            type="password"
                            {...registerField("password")}
                            placeholder="Password"
                            className="w-full rounded-lg border border-gray-600 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <p className="text-sm text-red-500">
                            {errors.password?.message}
                        </p>
                    </div>

                    <div>
                        <input
                            type="password"
                            {...registerField("password_confirmation")}
                            placeholder="Confirm Password"
                            className="w-full rounded-lg border border-gray-600 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <p className="text-sm text-red-500">
                            {errors.password_confirmation?.message}
                        </p>
                    </div>

                    {serverError && (
                        <div className="rounded bg-red-100 p-3 text-red-600">
                            {serverError}
                        </div>
                    )}

                    <button
                        disabled={isSubmitting}
                        className="w-full rounded bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSubmitting ? "Creating account..." : "Register"}
                    </button>

                    <div className="mt-6 text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}