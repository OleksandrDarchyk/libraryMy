import { useEffect, useState } from "react";
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
    const navigate = useNavigate();

    useEffect(() => {
        const load = async (): Promise<void> => {
            try {
                const [g, a] = await Promise.all([genreApi.getGenres(), authorApi.getAuthors()]);
                setGenres(g);
                setAuthors(a);
            } catch (e: unknown) {
                setErr(getErrorMessage(e));
            }
        };
        void load();
    }, []);

    const toggleAuthor = (id: string): void => {
        setAuthorsIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setErr(null);
        try {
            await bookApi.createBook({
                title,
                pages,
                genreId: genreId || undefined,
                authorsIds
            });
            navigate("/books");
        } catch (e: unknown) {
            setErr(getErrorMessage(e));
        }
    };

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
                    onChange={e => {
                        const v = Number.parseInt(e.currentTarget.value || "0", 10);
                        setPages(Number.isNaN(v) ? 0 : v);
                    }}
                    min={1}
                    required
                />
            </div>

            <div style={{ marginBottom: 8 }}>
                <label>Genre</label>
                <select
                    value={genreId}
                    onChange={e => setGenreId(e.currentTarget.value)}
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
                                checked={a.id ? authorsIds.includes(a.id) : false}
                                onChange={() => a.id && toggleAuthor(a.id)}
                            />
                            <span>{a.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <SubmitButton type="submit">Create</SubmitButton>
        </form>
    );
}
