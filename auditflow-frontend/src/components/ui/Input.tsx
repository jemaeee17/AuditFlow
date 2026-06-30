import { InputHTMLAttributes } from "react";

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export default function Input({
    error,
    className = "",
    ...props
}: InputProps) {
    return (
        <div>
            <input
                {...props}
                className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`}
            />

            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}