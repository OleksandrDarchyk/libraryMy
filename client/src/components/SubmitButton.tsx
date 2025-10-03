import type { ButtonHTMLAttributes } from "react";

export default function SubmitButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            style={{
                padding: "8px 12px",
                border: "1px solid #333",
                background: "#333",
                color: "#fff",
                borderRadius: 6,
                cursor: "pointer",
                ...(props.style || {}),
            }}
        />
    );
}
