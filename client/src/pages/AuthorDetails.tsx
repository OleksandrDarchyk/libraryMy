
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authorApi } from "../api/client";
import type { AuthorDto } from "../api/generated-client";
import { getErrorMessage } from "../lib/errors";

export default function AuthorDetails() {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<AuthorDto | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        if (!id) {
            setErr("Invalid author id");
            return;
        }
        setLoading(true);
        setErr(null);
        try {
            const data = await authorApi.getAuthorById(id);
            setItem(data);
        } catch (e: unknown) {
            setErr(getErrorMessage(e));
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        void load();
    }, [load]);

    if (loading && !item) return <div>Loading...</div>;
    if (err) return <div style={{ color: "crimson" }}>{err}</div>;
    if (!item) return null;

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <h2 style={{ margin: 0 }}>{item.name}</h2>
                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                    <Link
                        to={`/authors/${id}/edit`}
                        style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #333", textDecoration: "none", color: "#4ac0d3" }}
                    >
                        edit
                    </Link>
                    <button onClick={load} disabled={loading} style={{ padding: "6px 10px", borderRadius: 6 }}>
                        {loading ? "Loading..." : "Refresh"}
                    </button>
                </div>
            </div>

            {!!item.bookIds?.length && (
                <div>
                    <div style={{ fontWeight: 600, marginBottom: 6 }}>Books</div>
                    <ul>
                        {item.bookIds.map(bid => (
                            <li key={bid}>
                                <Link to={`/books/${bid}`}>{bid}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
