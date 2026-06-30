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

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
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
        </div>
    );
}