import Link from "next/link";
import { Document } from "@/types/document";

interface Props {
    document: Document;
}

export default function DocumentCard({ document }: Props) {
    const statusStyles = {
        pending: "bg-yellow-100 text-yellow-700",
        processing: "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
        failed: "bg-red-100 text-red-700",
    };

    const status =
        statusStyles[
        document.processing_status as keyof typeof statusStyles
        ] ?? "bg-gray-100 text-gray-700";

    const progress = document.processing_progress ?? 0;

    return (
        <Link
            href={`/documents/${document.id}`}
            className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
        >
            <h3 className="font-semibold text-slate-900">
                {document.original_filename}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
                {document.document_type.toUpperCase()}
            </p>

            <p className="mt-1 text-sm text-slate-400">
                Uploaded{" "}
                {new Date(document.created_at).toLocaleDateString()}
            </p>

            <div className="mt-4 flex items-center justify-between">
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${status}`}
                >
                    {document.processing_status.charAt(0).toUpperCase() +
                        document.processing_status.slice(1)}
                </span>

                <span className="text-sm text-slate-400">
                    {(document.file_size / 1024).toFixed(2)} KB
                </span>
            </div>

            <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                        {document.processing_status === "completed"
                            ? "Analysis completed"
                            : document.processing_status === "failed"
                                ? "Analysis failed"
                                : document.processing_status === "processing"
                                    ? "AI is analyzing your document..."
                                    : "Waiting for processing..."}
                    </span>

                    <span className="font-medium text-slate-700">
                        {progress}%
                    </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-500"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>
            </div>

            {(document.processing_status === "pending" ||
                document.processing_status === "processing") && (
                    <p className="mt-3 text-xs text-slate-400">
                        Please wait while AuditFlow processes your document.
                    </p>
                )}
        </Link>
    );
}