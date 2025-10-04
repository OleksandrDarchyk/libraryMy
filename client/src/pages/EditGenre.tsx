import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import { genreApi } from "../api/client";
import type { GenreDto } from "../api/generated-client";
import useLibraryCrud from "../useLibraryCrud";
import { getErrorMessage } from "../lib/errors";

export default function EditGenre() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { updateGenre } = useLibraryCrud();

    const [name, setName] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!id) { setErr("Invalid genre id"); return; }
        let active = true;
        (async () => {
            setLoading(true); setErr(null);
            try {
                const g: GenreDto = await genreApi.getGenreById(id);
                if (active) setName(g.name ?? "");
            } catch (e) {
                if (active) setErr(getErrorMessage(e));
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false; };
    }, [id]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id) return;
        setSaving(true);
        try {
            await updateGenre(id, { newName: name.trim() });
            navigate(`/genres`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (err) return <div style={{ color: "crimson" }}>{err}</div>;

    return (
        <form onSubmit={onSubmit} style={{ maxWidth: 480 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <h3 style={{ margin: 0, marginRight: "auto" }}>Edit genre</h3>
                <Link to={`/genres`}>← Back</Link>
            </div>

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

            <SubmitButton type="submit" disabled={saving || name.trim().length < 3}>
                {saving ? "Saving..." : "Save"}
            </SubmitButton>
        </form>
    );
}
