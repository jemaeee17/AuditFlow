interface Props {
    risk: string;
}

export default function RiskBadge({ risk }: Props) {
    const normalizedRisk = risk.toLowerCase();

    const styles = {
        low: "bg-green-100 text-green-700",
        medium: "bg-yellow-100 text-yellow-700",
        high: "bg-red-100 text-red-700",
        critical: "bg-red-200 text-red-800",
    };

    const style =
        styles[normalizedRisk as keyof typeof styles] ??
        "bg-slate-100 text-slate-700";

    return (
        <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm font-medium text-slate-500">
                Overall Risk
            </p>

            <div className="mt-4">
                <span
                    className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold uppercase ${style}`}
                >
                    {risk}
                </span>
            </div>
        </div>
    );
}