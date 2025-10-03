import type { BookDto } from "../api/generated-client";
import { Link } from "react-router-dom";

type Props = { book: BookDto };

export default function BookCard({ book }: Props) {
    return (
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>{book.title}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>pages: {book.pages}</div>
            {book.genre?.name && <div style={{ fontSize: 12, marginTop: 4 }}>genre: {book.genre.name}</div>}
            <Link to={`/books/${book.id}`} style={{ fontSize: 12, marginTop: 8, display: "inline-block" }}>
                details
            </Link>
        </div>
    );
}
