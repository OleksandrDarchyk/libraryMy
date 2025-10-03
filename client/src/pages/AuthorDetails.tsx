import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authorApi } from "../api/client";
import type { AuthorDto } from "../api/generated-client";

export default function AuthorDetails() {
    const { id } = useParams();
    const [item, setItem] = useState<AuthorDto | null>(null);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        authorApi.getAuthorById(id).then(setItem).catch(e => setErr(String(e)));
    }, [id]);

    if (err) return <div>{err}</div>;
    if (!item) return <div>Loading...</div>;

    return (
        <div>
            <h2>{item.name}</h2>
            {item.bookIds?.length ? (
                <div style={{ marginTop: 8 }}>
                    <div style={{ fontWeight: 600 }}>books:</div>
                    <ul>
                        {item.bookIds.map(x => <li key={x}>{x}</li>)}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}
