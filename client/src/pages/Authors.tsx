import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { authorApi } from "../api/client";
import type { AuthorDto } from "../api/generated-client";
import AuthorCard from "../components/AuthorCard";
import { getErrorMessage } from "../lib/errors";
import toast from "react-hot-toast";

export default function Authors() {
    const [items, setItems] = useState<AuthorDto[]>([]);
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [q, setQ] = useState("");

    const load = useCallback(async () => {
        setLoading(true);
        setErr(null);
        try {
            const data = await authorApi.getAuthors();
            setItems(data);
        } catch (e: unknown) {
            setErr(getErrorMessage(e));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return items;
        return items.filter(a => (a.name ?? "").toLowerCase().includes(s));
    }, [items, q]);

    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!window.confirm("Delete this author?")) return;
        setDeletingId(id);
        try {
            await authorApi.deleteAuthor(id);
            setItems(prev => prev.filter(x => x.id !== id));
            toast.success("Author deleted");
        } catch (e: unknown) {
            toast.error(getErrorMessage(e));
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <h2 style={{ margin: 0, marginRight: "auto" }}>Authors</h2>
                <input
                    placeholder="search by name..."
                    value={q}
                    onChange={e => setQ(e.currentTarget.value)}
                    style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
                />
                <button onClick={load} disabled={loading} style={{ padding: "8px 10px", borderRadius: 6 }}>
                    {loading ? "Loading..." : "Refresh"}
                </button>
                <Link to="/authors/new">+ New author</Link>
            </div>

            {err && <div style={{ color: "crimson", marginBottom: 12 }}>{err}</div>}
            {loading && !items.length && <div>Loading...</div>}
            {!loading && !filtered.length && <div>No authors yet</div>}

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {filtered.map(a => (
                    <div key={a.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <AuthorCard author={a} />
                        <div style={{ display: "flex", gap: 8 }}>
                            <Link to={`/authors/${a.id}`} style={{ padding: "6px 10px" }}>
                                details
                            </Link>
                            <button
                                onClick={() => handleDelete(a.id)}
                                disabled={deletingId === a.id}
                                style={{
                                    padding: "6px 10px",
                                    borderRadius: 6,
                                    border: "1px solid #d33",
                                    color: deletingId === a.id ? "#999" : "#d33",
                                    background: "transparent",
                                    cursor: deletingId === a.id ? "not-allowed" : "pointer"
                                }}
                            >
                                {deletingId === a.id ? "deleting..." : "delete"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
