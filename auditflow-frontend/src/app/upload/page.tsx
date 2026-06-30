"use client";

import UploadCard from "@/components/upload/UploadCard";

export default function UploadPage() {
    return (
        <main className="min-h-screen bg-slate-100 p-10">
            <div className="mx-auto max-w-4xl">

                <h1 className="mb-2 text-4xl font-bold text-slate-900">
                    Upload Document
                </h1>

                <p className="mb-8 text-slate-600">
                    Upload your PDF or Markdown document for auditing.
                </p>

                <UploadCard />

            </div>
        </main>
    );
}