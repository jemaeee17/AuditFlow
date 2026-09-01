interface Props {
    score: number;
}

export default function ComplianceScore({ score }: Props) {
    const numericScore = Number(score);

    return (
        <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-slate-500">
                Compliance Score
            </p>

            <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-bold text-slate-900">
                    {numericScore}
                </span>

                <span className="mb-1 text-xl text-slate-500">
                    %
                </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{
                        width: `${Math.min(
                            Math.max(numericScore, 0),
                            100
                        )}%`,
                    }}
                />
            </div>
        </div>
    );
}