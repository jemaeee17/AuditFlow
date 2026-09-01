import { AuditRecommendation } from "@/types/document";

interface Props {
    recommendations: AuditRecommendation[];
}

export default function AuditRecommendations({
    recommendations,
}: Props) {
    return (
        <section className="rounded-2xl bg-white p-8 shadow">
            <h2 className="text-xl font-semibold text-slate-900">
                Recommendations
            </h2>

            {recommendations.length === 0 ? (
                <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-center">
                    <p className="text-slate-500">
                        No recommendations available.
                    </p>
                </div>
            ) : (
                <div className="mt-6 space-y-4">
                    {recommendations.map((recommendation, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-slate-200 p-5"
                        >
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                {recommendation.category}
                            </span>

                            <p className="mt-4 leading-6 text-slate-600">
                                {recommendation.recommendation}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}