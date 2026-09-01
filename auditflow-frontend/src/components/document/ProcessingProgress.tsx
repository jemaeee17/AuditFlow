interface ProcessingProgressProps {
    status: string;
    progress: number;
}

const getStageMessage = (status: string, progress: number) => {
    if (status === "completed") {
        return "Analysis completed.";
    }

    if (status === "failed") {
        return "Analysis failed.";
    }

    if (progress >= 70) {
        return "Analyzing document with AI...";
    }

    if (progress >= 30) {
        return "Extracting text from document...";
    }

    return "Preparing document...";
};

export default function ProcessingProgress({
    status,
    progress,
}: ProcessingProgressProps) {
    const message = getStageMessage(status, progress);

    if (status === "completed") {
        return (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                <div className="flex items-center justify-between">
                    <span className="font-medium text-green-800">
                        Analysis completed
                    </span>

                    <span className="font-semibold text-green-700">
                        100%
                    </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-green-100">
                    <div
                        className="h-full rounded-full bg-green-500"
                        style={{ width: "100%" }}
                    />
                </div>
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="font-medium text-red-700">
                    Analysis failed.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-center justify-between">
                <span className="font-medium text-slate-800">
                    {message}
                </span>

                <span className="font-semibold text-blue-600">
                    {progress}%
                </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100">
                <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>

            <p className="mt-2 text-sm text-slate-500">
                Please wait while AuditFlow processes your document.
            </p>
        </div>
    );
}