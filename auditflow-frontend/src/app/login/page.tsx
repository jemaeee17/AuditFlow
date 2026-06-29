"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormData } from "@/lib/validations/auth";
import { useAuth } from "@/hooks/useAuth";

import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();

    const [serverError, setServerError] = useState("");
    const { login, user, loading } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            router.replace("/dashboard");
        }
    }, [loading, user, router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true);
        setServerError("");

        try {
            await login(data);

            router.push("/dashboard");
        } catch (error: any) {
            setServerError(
                error.response?.data?.message ?? "Login failed."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">

                <h1 className="mb-2 text-center text-3xl font-bold text-slate-900">
                    Welcome Back
                </h1>

                <p className="mb-6 text-center text-slate-500">
                    Sign in to your AuditFlow account
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />

                        <p className="mt-1 text-sm text-red-600">
                            {errors.email?.message}
                        </p>
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />

                        <p className="mt-1 text-sm text-red-600">
                            {errors.password?.message}
                        </p>
                    </div>

                    {serverError && (
                        <div className="rounded-lg bg-red-100 p-3 text-red-600">
                            {serverError}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting ? "Signing In..." : "Login"}
                    </button>

                    <div className="mt-6 text-center text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}