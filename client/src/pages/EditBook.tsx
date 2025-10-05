import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authorApi, bookApi, genreApi } from "../api/client";
import type { AuthorDto, GenreDto } from "../api/generated-client";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import useLibraryCrud from "../useLibraryCrud";
import { getErrorMessage } from "../lib/errors";

export default function EditBook() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { updateBook } = useLibraryCrud();

    // form state
    const [title, setTitle] = useState("");
    const [pages, setPages] = useState<number>(1);
    const [genreId, setGenreId] = useState<string>("");
    const [authorsIds, setAuthorsIds] = useState<string[]>([]);

    // lists
    const [genres, setGenres] = useState<GenreDto[]>([]);
    const [authors, setAuthors] = useState<AuthorDto[]>([]);

    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!id) { setErr("Invalid book id"); return; }
        let active = true;
        (async () => {
            setLoading(true); setErr(null);
            try {
                const [g, a, b] = await Promise.all([
                    genreApi.getGenres(),
                    authorApi.getAuthors(),
                    bookApi.getBookById(id),
                ]);
                if (!active) return;
                setGenres(g);
                setAuthors(a);
                setTitle(b.title ?? "");
                setPages(b.pages ?? 1);
                setGenreId(b.genre?.id ?? "");        // empty = keep/none
                setAuthorsIds(b.authorsIds ?? []);
            } catch (e) {
                if (active) setErr(getErrorMessage(e));
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false; };
    }, [id]);

    const onPagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number.parseInt(e.currentTarget.value || "0", 10);
        setPages(Number.isNaN(v) || v < 1 ? 1 : v);
    };

    const toggleAuthor = (aid: string) => {
        setAuthorsIds(prev => prev.includes(aid) ? prev.filter(x => x !== aid) : [...prev, aid]);
    };

    const canSubmit = useMemo(() => title.trim().length >= 1 && pages >= 1, [title, pages]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id || !canSubmit) return;
        setSaving(true);
        try {
            await updateBook(id, {
                newTitle: title.trim(),
                newPageCount: pages,
                // NOTE: sending undefined keeps current genre on server; empty string becomes undefined
                genreId: genreId || undefined,
                // Authors: sending array replaces the list
                authorsIds,
            });
            navigate(`/books/${id}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (err) return <div style={{ color: "crimson" }}>{err}</div>;

    return (
        <form onSubmit={onSubmit} style={{ maxWidth: 640 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <h3 style={{ margin: 0, marginRight: "auto" }}>Edit book</h3>
                <Link to={`/books/${id}`}>← Back</Link>
            </div>

            <div style={{ marginBottom: 8 }}>
                <label>Title</label>
                <FormInput value={title} onChange={e => setTitle(e.currentTarget.value)} required minLength={1} />
            </div>

            <div style={{ marginBottom: 8 }}>
                <label>Pages</label>
                <FormInput type="number" value={pages} onChange={onPagesChange} min={1} required />
            </div>

            <div style={{ marginBottom: 8 }}>
                <label>Genre</label>
                <select
                    value={genreId}
                    onChange={e => setGenreId(e.currentTarget.value)}
                    style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc", width: "100%" }}
                >
                    <option value="">— keep / none —</option>
                    {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
            </div>

            <div style={{ marginBottom: 12 }}>
                <label>Authors</label>
                <div style={{ display: "grid", gap: 6, gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
                    {authors.map(a => (
                        <label key={a.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <input
                                type="checkbox"
                                disabled={!a.id}
                                checked={a.id ? authorsIds.includes(a.id) : false}
                                onChange={() => a.id && toggleAuthor(a.id)}
                            />
                            <span>{a.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <SubmitButton type="submit" disabled={!canSubmit || saving}>
                {saving ? "Saving..." : "Save"}
            </SubmitButton>
        </form>
    );
}
