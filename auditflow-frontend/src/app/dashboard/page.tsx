"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getDocuments } from "@/services/document.service";
import DocumentList from "@/components/document/DocumentList";
import { Document } from "@/types/document";

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loadingDocuments, setLoadingDocuments] = useState(true);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        try {
            const data = await getDocuments();

            setDocuments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingDocuments(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-100">

            {/* Header */}
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            AuditFlow
                        </h1>

                        <p className="text-slate-500">
                            AI Compliance Auditor
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>
            </header>

            {/* Content */}

            <div className="mx-auto max-w-6xl p-8">

                <h2 className="text-3xl font-bold text-slate-900">
                    Welcome back,
                </h2>

                <p className="mt-2 text-slate-600">
                    {user?.name}
                </p>

                {/* Upload Card */}

                <Link
                    href="/upload"
                    className="mt-10 block rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"
                >
                    <h3 className="text-xl font-semibold text-slate-900">
                        📄 Upload Document
                    </h3>

                    <p className="mt-2 text-slate-600">
                        Upload a PDF or Markdown document for AI auditing.
                    </p>
                </Link>

                {/* Recent Documents */}

                <section className="mt-10 rounded-2xl bg-white p-8 shadow">

                    <h3 className="text-xl font-semibold text-slate-900">
                        Recent Documents
                    </h3>

                    <div className="mt-6">

                        {loadingDocuments ? (

                            <p className="text-slate-500">
                                Loading documents...
                            </p>

                        ) : (

                            <DocumentList
                                documents={documents}
                            />

                        )}

                    </div>

                </section>

            </div>

        </main>
    );
}