import { useEffect, useState } from "react";
import { authorApi } from "../api/client";
import type { AuthorDto } from "../api/generated-client";
import AuthorCard from "../components/AuthorCard";

export default function Authors() {
    const [items, setItems] = useState<AuthorDto[]>([]);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        authorApi.getAuthors().then(setItems).catch(e => setErr(String(e)));
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: 12 }}>Authors</h2>
            {err && <div>{err}</div>}
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {items.map(a => <AuthorCard key={a.id} author={a} />)}
            </div>
        </div>
    );
}
