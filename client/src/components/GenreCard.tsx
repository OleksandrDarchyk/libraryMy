import type { GenreDto } from "../api/generated-client";

type Props = { genre: GenreDto };

export default function GenreCard({ genre }: Props) {
    return (
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>{genre.name}</div>
        </div>
    );
}
