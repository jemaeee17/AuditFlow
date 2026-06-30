import { Document } from "@/types/document";
import DocumentCard from "./DocumentCard";

interface Props {
    documents: Document[];
}

export default function DocumentList({
    documents,
}: Props) {
    if (documents.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                No documents uploaded yet.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {documents.map((document) => (
                <DocumentCard
                    key={document.id}
                    document={document}
                />
            ))}
        </div>
    );
}