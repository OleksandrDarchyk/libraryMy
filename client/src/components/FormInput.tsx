import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function FormInput(props: Props) {
    return (
        <input
            {...props}
            style={{
                padding: 8,
                border: "1px solid #ccc",
                borderRadius: 6,
                width: "100%",
                ...(props.style || {}),
            }}
        />
    );
}
