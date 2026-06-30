interface Props {
    progress: number;
}

export default function UploadProgress({
    progress,
}: Props) {
    return (
        <div className="mt-6">

            <div className="mb-2 flex justify-between">

                <span className="text-sm font-medium">
                    Uploading...
                </span>

                <span className="text-sm">
                    {progress}%
                </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>

        </div>
    );
}