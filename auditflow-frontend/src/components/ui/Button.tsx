import { ButtonHTMLAttributes } from "react";

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export default function Button({
    children,
    loading,
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            disabled={loading || props.disabled}
            className={`rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}