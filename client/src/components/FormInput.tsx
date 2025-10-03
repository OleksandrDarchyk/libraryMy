import type { InputHTMLAttributes } from "react";

export default function FormInput(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            style={{
                padding: "8px 10px",
                border: "1px solid #ccc",
                borderRadius: 6,
                width: "100%",
                ...(props.style || {}),
            }}
        />
    );
}
