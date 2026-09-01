"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { uploadDocument, getDocument } from "@/services/document.service";
import UploadProgress from "./UploadProgress";
import UploadSuccess from "./UploadSuccess";

export default function DragDropZone() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [progress, setProgress] = useState(0);

    const [uploading, setUploading] = useState(false);

    const [success, setSuccess] = useState(false);

    const [error, setError] = useState("");

    const [file, setFile] = useState<File | null>(null);

    const [documentId, setDocumentId] = useState<number | null>(null);
    const [processingStatus, setProcessingStatus] = useState<string | null>(null);

    useEffect(() => {
        if (!documentId) return;

        const interval = setInterval(async () => {
            try {
                const document = await getDocument(documentId);

                setProcessingStatus(document.processing_status);

                if (
                    document.processing_status === "completed" ||
                    document.processing_status === "failed"
                ) {
                    clearInterval(interval);
                }
            } catch (error) {
                console.error("Failed to fetch document status:", error);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [documentId]);

    const handleFile = (selectedFile: File) => {
        setFile(selectedFile);
    };

    const upload = async () => {
        if (!file) return;

        setUploading(true);
        setSuccess(false);
        setError("");
        setProgress(0);
        setProcessingStatus(null);

        try {
            const response = await uploadDocument(
                file,
                setProgress
            );

            const documentId = response.document.id;

            setDocumentId(documentId);
            setProcessingStatus(
                response.document.processing_status
            );
            setSuccess(true);

        } catch (err: any) {

            setError(
                err.response?.data?.message ??
                "Upload failed."
            );

        } finally {

            setUploading(false);

        }
    };

    return (
        <div>

            <div
                onClick={() => inputRef.current?.click()}
                className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-12 text-center transition hover:border-blue-500 hover:bg-slate-50"
            >

                <p className="text-lg font-semibold text-slate-700">
                    Click to select a file
                </p>

                <p className="mt-2 text-slate-500">
                    PDF or Markdown
                </p>

            </div>

            <input
                ref={inputRef}
                hidden
                type="file"
                accept=".pdf,.md,.markdown"
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        handleFile(e.target.files[0]);
                    }
                }}
            />

            {file && (
                <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">

                    <h2 className="font-semibold text-slate-900">
                        Selected File
                    </h2>

                    <p className="mt-2 text-slate-600">
                        {file.name}
                    </p>

                    <p className="text-sm text-slate-500">
                        {(file.size / 1024).toFixed(2)} KB
                    </p>

                </div>
            )}

            <div className="mt-6">

                <button
                    onClick={upload}
                    disabled={uploading}
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {uploading
                        ? "Uploading..."
                        : "Upload Document"}
                </button>

            </div>

            {uploading && (
                <UploadProgress
                    progress={progress}
                />
            )}

            {success && file && (
                <UploadSuccess
                    filename={file.name}
                />
            )}

            {error && (
                <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-600">
                    {error}
                </div>
            )}

        </div>
    );
}