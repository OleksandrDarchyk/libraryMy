import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({ children, ...rest }: Props) {
    return (
        <button
            {...rest}
            style={{
                padding: "8px 12px",
                border: "1px solid #333",
                borderRadius: 6,
                background: "#111",
                color: "#fff",
                cursor: "pointer",
                ...(rest.style || {}),
            }}
        >
            {children}
        </button>
    );
}
