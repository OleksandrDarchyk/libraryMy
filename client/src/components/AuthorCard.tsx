import type { AuthorDto } from "../api/generated-client";
import { Link } from "react-router-dom";

type Props = { author: AuthorDto };

export default function AuthorCard({ author }: Props) {
    return (
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>{author.name}</div>
            <Link to={`/authors/${author.id}`} style={{ fontSize: 12, marginTop: 8, display: "inline-block" }}>
                details
            </Link>
        </div>
    );
}
