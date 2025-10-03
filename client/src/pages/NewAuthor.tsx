import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorApi } from "../api/client";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import { getErrorMessage } from "../lib/errors";

export default function NewAuthor() {
    const [name, setName] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setErr(null);
        try {
            await authorApi.createAuthor({ name });
            navigate("/authors");
        } catch (err: unknown) {
            setErr(getErrorMessage(err));
        }
    };

    return (
        <form onSubmit={onSubmit} style={{ maxWidth: 480 }}>
            <h3 style={{ marginBottom: 12 }}>Create author</h3>
            {err && <div style={{ color: "crimson", marginBottom: 8 }}>{err}</div>}
            <div style={{ marginBottom: 8 }}>
                <label>Name</label>
                <FormInput
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                    minLength={3}
                />
            </div>
            <SubmitButton type="submit">Create</SubmitButton>
        </form>
    );
}
