import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { genreApi } from "../api/client";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import { getErrorMessage } from "../lib/errors";

export default function NewGenre() {
    const [name, setName] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const canSubmit = useMemo(() => name.trim().length >= 3, [name]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!canSubmit || submitting) return;
        setErr(null);
        setSubmitting(true);
        try {
            await genreApi.createGenre({ name: name.trim() });
            navigate("/genres");
        } catch (ex: unknown) {
            setErr(getErrorMessage(ex));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={onSubmit} style={{ maxWidth: 480 }}>
            <h3 style={{ marginBottom: 12 }}>Create genre</h3>
            {err && <div style={{ color: "crimson", marginBottom: 8 }}>{err}</div>}
            <div style={{ marginBottom: 8 }}>
                <label>Name</label>
                <FormInput
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                    minLength={3}
                    autoFocus
                />
            </div>
            <SubmitButton type="submit" disabled={!canSubmit || submitting}>
                {submitting ? "Creating..." : "Create"}
            </SubmitButton>
        </form>
    );
}
