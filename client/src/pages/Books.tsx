import { useEffect, useState } from "react";
import { bookApi } from "../api/client";
import type { BookDto } from "../api/generated-client";
import BookCard from "../components/BookCard";

export default function Books() {
    const [items, setItems] = useState<BookDto[]>([]);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        bookApi.getBooks().then(setItems).catch(e => setErr(String(e)));
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: 12 }}>Books</h2>
            {err && <div>{err}</div>}
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {items.map(b => <BookCard key={b.id} book={b} />)}
            </div>
        </div>
    );
}
