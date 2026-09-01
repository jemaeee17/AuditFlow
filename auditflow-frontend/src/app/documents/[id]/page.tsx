"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { getDocument } from "@/services/document.service";
import { Document } from "@/types/document";

import ComplianceScore from "@/components/audit/ComplianceScore";
import RiskBadge from "@/components/audit/RiskBadge";
import AuditSummary from "@/components/audit/AuditSummary";
import AuditIssues from "@/components/audit/AuditIssues";
import AuditRecommendations from "@/components/audit/AuditRecommendations";

export default function DocumentDetailsPage() {
    const params = useParams();

    const [document, setDocument] = useState<Document | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDocument = async () => {
            try {
                const data = await getDocument(Number(params.id));

                setDocument(data);
            } catch (error) {
                console.error(error);
                setError("Failed to load document.");
            } finally {
                setLoading(false);
            }
        };

        loadDocument();
    }, [params.id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-100 p-8">
                <div className="mx-auto max-w-6xl">
                    <p className="text-slate-500">
                        Loading document...
                    </p>
                </div>
            </main>
        );
    }

    if (error || !document) {
        return (
            <main className="min-h-screen bg-slate-100 p-8">
                <div className="mx-auto max-w-6xl">
                    <p className="text-red-500">
                        {error ?? "Document not found."}
                    </p>

                    <Link
                        href="/dashboard"
                        className="mt-4 inline-block text-blue-600 hover:underline"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </main>
        );
    }

    const auditResult = document.audit_result;

    return (
        <main className="min-h-screen bg-slate-100">

            <header className="border-b bg-white">
                <div className="mx-auto max-w-6xl px-8 py-5">

                    <Link
                        href="/dashboard"
                        className="text-sm text-slate-500 hover:text-slate-900"
                    >
                        ← Back to Dashboard
                    </Link>

                    <h1 className="mt-3 text-2xl font-bold text-slate-900">
                        {document.original_filename}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        {document.document_type.toUpperCase()}
                    </p>

                </div>
            </header>

            <div className="mx-auto max-w-6xl space-y-6 p-8">

                {/* Processing Status */}

                <section className="rounded-2xl bg-white p-8 shadow">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Processing Status
                    </h2>

                    <div className="mt-4 flex items-center gap-3">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                            {document.processing_status}
                        </span>
                    </div>
                </section>

                {auditResult ? (
                    <>
                        {/* Score + Risk */}

                        <div className="grid gap-6 md:grid-cols-2">
                            <ComplianceScore
                                score={auditResult.compliance_score}
                            />

                            <RiskBadge
                                risk={auditResult.overall_risk}
                            />
                        </div>

                        {/* Summary */}

                        <AuditSummary
                            summary={auditResult.summary}
                        />

                        {/* Issues */}

                        <AuditIssues
                            issues={auditResult.issues}
                        />

                        {/* Recommendations */}

                        <AuditRecommendations
                            recommendations={
                                auditResult.recommendations
                            }
                        />
                    </>
                ) : (
                    <section className="rounded-2xl bg-white p-8 shadow">
                        <p className="text-slate-500">
                            AI analysis is not available yet.
                        </p>
                    </section>
                )}

            </div>

        </main>
    );
}