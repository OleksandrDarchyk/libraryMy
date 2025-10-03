import type { AuthorDto } from "../api/generated-client";

export default function AuthorCard({ author }: { author: AuthorDto }) {
    return (
        <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>{author.name}</div>
        </div>
    );
}
