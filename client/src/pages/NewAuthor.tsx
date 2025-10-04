import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import useLibraryCrud from "../useLibraryCrud";

export default function NewAuthor() {
    const [name, setName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { createAuthor } = useLibraryCrud();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createAuthor({ name });
            navigate("/authors");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={onSubmit} style={{ maxWidth: 480 }}>
            <h3 style={{ marginBottom: 12 }}>Create author</h3>
            <div style={{ marginBottom: 8 }}>
                <label>Name</label>
                <FormInput
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                    minLength={3}
                />
            </div>
            <SubmitButton type="submit" disabled={submitting || name.trim().length < 3}>
                {submitting ? "Creating..." : "Create"}
            </SubmitButton>
        </form>
    );
}
