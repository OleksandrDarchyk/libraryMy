import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookApi } from "../api/client";
import type { BookDto } from "../api/generated-client";

export default function BookDetails() {
    const { id } = useParams();
    const [item, setItem] = useState<BookDto | null>(null);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        bookApi.getBookById(id).then(setItem).catch(e => setErr(String(e)));
    }, [id]);

    if (err) return <div>{err}</div>;
    if (!item) return <div>Loading...</div>;

    return (
        <div>
            <h2>{item.title}</h2>
            <div>pages: {item.pages}</div>
            {item.genre?.name && <div>genre: {item.genre.name}</div>}
            {item.authorsIds?.length ? (
                <div style={{ marginTop: 8 }}>
                    <div style={{ fontWeight: 600 }}>authors:</div>
                    <ul>
                        {item.authorsIds.map(x => <li key={x}>{x}</li>)}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}
