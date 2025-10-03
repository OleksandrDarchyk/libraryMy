import { useEffect, useState } from "react";
import { genreApi } from "../api/client";
import type { GenreDto } from "../api/generated-client";
import GenreCard from "../components/GenreCard";

export default function Genres() {
    const [items, setItems] = useState<GenreDto[]>([]);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        genreApi.getGenres().then(setItems).catch(e => setErr(String(e)));
    }, []);

    return (
        <div>
            <h2 style={{ marginBottom: 12 }}>Genres</h2>
            {err && <div>{err}</div>}
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {items.map(g => <GenreCard key={g.id} genre={g} />)}
            </div>
        </div>
    );
}
