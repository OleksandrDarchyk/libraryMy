import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { authorApi, bookApi, genreApi } from "../api/client";
import type { AuthorDto, GenreDto } from "../api/generated-client";
import FormInput from "../components/FormInput";
import SubmitButton from "../components/SubmitButton";
import { getErrorMessage } from "../lib/errors";

export default function NewBook() {
    const [title, setTitle] = useState("");
    const [pages, setPages] = useState<number>(1);
    const [genres, setGenres] = useState<GenreDto[]>([]);
    const [authors, setAuthors] = useState<AuthorDto[]>([]);
    const [genreId, setGenreId] = useState<string>("");
    const [authorsIds, setAuthorsIds] = useState<string[]>([]);
    const [err, setErr] = useState<string | null>(null);
    const [loadingLists, setLoadingLists] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async (): Promise<void> => {
            setLoadingLists(true);
            setErr(null);
            try {
                const [g, a] = await Promise.all([genreApi.getGenres(), authorApi.getAuthors()]);
                setGenres(g);
                setAuthors(a);
            } catch (e: unknown) {
                setErr(getErrorMessage(e));
            } finally {
                setLoadingLists(false);
            }
        };
        void load();
    }, []);

    const toggleAuthor = (id: string): void => {
        setAuthorsIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!canSubmit) return;
        setErr(null);
        setSubmitting(true);
        try {
            await bookApi.createBook({
                title: title.trim(),
                pages,
                genreId: genreId || undefined,
                authorsIds
            });
            navigate("/books");
        } catch (e: unknown) {
            setErr(getErrorMessage(e));
        } finally {
            setSubmitting(false);
        }
    };

    const onPagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number.parseInt(e.currentTarget.value || "0", 10);
        if (Number.isNaN(v) || v < 1) setPages(1);
        else setPages(v);
    };

    const canSubmit = useMemo(() => title.trim().length >= 1 && pages >= 1, [title, pages]);

    return (
        <form onSubmit={onSubmit} style={{ maxWidth: 640 }}>
            <h3 style={{ marginBottom: 12 }}>Create book</h3>

            {err && <div style={{ color: "crimson", marginBottom: 8 }}>{err}</div>}

            <div style={{ marginBottom: 8 }}>
                <label>Title</label>
                <FormInput
                    value={title}
                    onChange={e => setTitle(e.currentTarget.value)}
                    required
                    minLength={1}
                />
            </div>

            <div style={{ marginBottom: 8 }}>
                <label>Pages</label>
                <FormInput
                    type="number"
                    value={pages}
                    onChange={onPagesChange}
                    min={1}
                    required
                />
            </div>

            <div style={{ marginBottom: 8 }}>
                <label>Genre</label>
                <select
                    value={genreId}
                    onChange={e => setGenreId(e.currentTarget.value)}
                    disabled={loadingLists}
                    style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc", width: "100%" }}
                >
                    <option value="">— none —</option>
                    {genres.map(g => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
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

            <SubmitButton type="submit" disabled={!canSubmit || submitting || loadingLists}>
                {submitting ? "Creating..." : "Create"}
            </SubmitButton>
        </form>
    );
}
