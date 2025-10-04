import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { bookApi } from "../api/client";
import type { BookDto } from "../api/generated-client";
import { getErrorMessage } from "../lib/errors";

export default function BookDetails() {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<BookDto | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) {
            setErr("Missing id");
            return;
        }
        let active = true;
        (async () => {
            setLoading(true);
            setErr(null);
            try {
                const data = await bookApi.getBookById(id);
                if (active) setItem(data);
            } catch (e: unknown) {
                if (active) setErr(getErrorMessage(e));
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => {
            active = false;
        };
    }, [id]);

    if (err) return <div style={{ color: "crimson" }}>{err}</div>;
    if (loading || !item) return <div>Loading...</div>;

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h2 style={{ margin: 0, marginRight: "auto" }}>{item.title}</h2>
                <Link to="/books">← Back</Link>
            </div>
            <div>pages: {item.pages}</div>
            {item.genre?.name && <div>genre: {item.genre.name}</div>}
            {item.authorsIds?.length ? (
                <div style={{ marginTop: 8 }}>
                    <div style={{ fontWeight: 600 }}>authors:</div>
                    <ul>
                        {item.authorsIds.map(x => (
                            <li key={x}>
                                <code>{x}</code>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}
