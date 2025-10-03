import type { BookDto } from "../api/generated-client";

export default function BookCard({ book }: { book: BookDto }) {
    return (
        <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>{book.title}</div>
            <div>Pages: {book.pages}</div>
            {book.genre?.name && <div>Genre: {book.genre.name}</div>}
        </div>
    );
}
