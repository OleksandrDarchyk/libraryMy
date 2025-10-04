import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { booksAtom } from "../atoms/atoms";
import useLibraryCrud from "../useLibraryCrud";
import BookCard from "../components/BookCard";

export default function Books() {
    const [books] = useAtom(booksAtom);
    const { getBooks, deleteBook } = useLibraryCrud();
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState("");

    const load = async (): Promise<void> => {
        setLoading(true);
        try {
            await getBooks();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return books;
        return books.filter(b => (b.title ?? "").toLowerCase().includes(s));
    }, [books, q]);

    const handleDelete = async (id: string): Promise<void> => {
        if (!window.confirm("Delete this book?")) return;
        await deleteBook(id);
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

            {loading && !books.length && <div>Loading...</div>}
            {!loading && !filtered.length && <div>No books yet</div>}

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {filtered.map(b => (
                    <div key={b.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <BookCard book={b} />
                        <button
                            onClick={() => b.id && handleDelete(b.id)}
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
