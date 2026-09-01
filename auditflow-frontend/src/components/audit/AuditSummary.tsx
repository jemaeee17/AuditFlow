interface Props {
    summary: string;
}

export default function AuditSummary({ summary }: Props) {
    return (
        <section className="rounded-2xl bg-white p-8 shadow">
            <h2 className="text-xl font-semibold text-slate-900">
                AI Summary
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
                {summary}
            </p>
        </section>
    );
}