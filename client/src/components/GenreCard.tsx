import type { GenreDto } from "../api/generated-client";

export default function GenreCard({ genre }: { genre: GenreDto }) {
    return (
        <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>{genre.name}</div>
        </div>
    );
}
