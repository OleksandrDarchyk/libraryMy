import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { bookApi } from "../api/client";
import type { BookDto } from "../api/generated-client";
import BookCard from "../components/BookCard";
import { getErrorMessage } from "../lib/errors";

export default function Books() {
    const [items, setItems] = useState<BookDto[]>([]);
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState("");

    const load = async (): Promise<void> => {
        setLoading(true);
        setErr(null);
        try {
            const data = await bookApi.getBooks();
            setItems(data);
        } catch (err: unknown) {
            setErr(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void load();
    }, []);

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return items;
        return items.filter(b => (b.title ?? "").toLowerCase().includes(s));
    }, [items, q]);

    const handleDelete = async (id: string): Promise<void> => {
        if (!window.confirm("Delete this book?")) return;
        try {
            await bookApi.deleteBook(id);
            setItems(prev => prev.filter(x => x.id !== id));
        } catch (err: unknown) {
            window.alert(getErrorMessage(err));
        }
    };

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <h2 style={{ margin: 0, marginRight: "auto" }}>Books</h2>
                <input
                    placeholder="search by title..."
                    value={q}
                    onChange={e => setQ(e.currentTarget.value)}
                    style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
                />
                <button onClick={load} disabled={loading} style={{ padding: "8px 10px", borderRadius: 6 }}>
                    {loading ? "Loading..." : "Refresh"}
                </button>
                <Link to="/books/new">+ New book</Link>
            </div>

            {err && <div style={{ color: "crimson", marginBottom: 12 }}>{err}</div>}
            {loading && !items.length && <div>Loading...</div>}
            {!loading && !filtered.length && <div>No books yet</div>}

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {filtered.map(b => (
                    <div key={b.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <BookCard book={b} />
                        <button
                            onClick={() => handleDelete(b.id!)}
                            style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #d33", color: "#d33", background: "transparent" }}
                        >
                            delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
