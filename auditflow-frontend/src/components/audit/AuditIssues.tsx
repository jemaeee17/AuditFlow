import { AuditIssue } from "@/types/document";

interface Props {
    issues: AuditIssue[];
}

export default function AuditIssues({ issues }: Props) {
    return (
        <section className="rounded-2xl bg-white p-8 shadow">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                    Detected Issues
                </h2>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                    {issues.length} issue{issues.length !== 1 ? "s" : ""}
                </span>
            </div>

            {issues.length === 0 ? (
                <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-center">
                    <p className="text-slate-500">
                        No compliance issues were detected.
                    </p>
                </div>
            ) : (
                <div className="mt-6 space-y-4">
                    {issues.map((issue, index) => {
                        const severity = issue.severity.toLowerCase();

                        const severityStyle =
                            severity === "high" ||
                                severity === "critical"
                                ? "bg-red-100 text-red-700"
                                : severity === "medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700";

                        return (
                            <div
                                key={index}
                                className="rounded-xl border border-slate-200 p-5"
                            >
                                <div className="flex flex-wrap items-center gap-2">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${severityStyle}`}
                                    >
                                        {issue.severity}
                                    </span>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                        {issue.category}
                                    </span>
                                </div>

                                <h3 className="mt-4 font-semibold text-slate-900">
                                    {issue.clause}
                                </h3>

                                <p className="mt-2 leading-6 text-slate-600">
                                    {issue.issue}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}