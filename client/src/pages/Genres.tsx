import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { genresAtom } from "../atoms/atoms";
import useLibraryCrud from "../useLibraryCrud";
import GenreCard from "../components/GenreCard";

export default function Genres() {
    const [genres] = useAtom(genresAtom);
    const { getGenres, deleteGenre } = useLibraryCrud();
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState("");

    const load = async (): Promise<void> => {
        setLoading(true);
        try {
            await getGenres();
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
        if (!s) return genres;
        return genres.filter(g => (g.name ?? "").toLowerCase().includes(s));
    }, [genres, q]);

    const handleDelete = async (id: string): Promise<void> => {
        if (!window.confirm("Delete this genre?")) return;
        await deleteGenre(id);
    };

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <h2 style={{ margin: 0, marginRight: "auto" }}>Genres</h2>
                <input
                    placeholder="search by name..."
                    value={q}
                    onChange={e => setQ(e.currentTarget.value)}
                    style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
                />
                <button onClick={load} disabled={loading} style={{ padding: "8px 10px", borderRadius: 6 }}>
                    {loading ? "Loading..." : "Refresh"}
                </button>
                <Link to="/genres/new">+ New genre</Link>
            </div>

            {loading && !genres.length && <div>Loading...</div>}
            {!loading && !filtered.length && <div>No genres yet</div>}

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {filtered.map(g => (
                    <div key={g.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <GenreCard genre={g} />
                        <button
                            onClick={() => g.id && handleDelete(g.id)}
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
