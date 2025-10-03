import { useEffect } from "react";
import { authorApi } from "./api/client.ts";
import Router from "./app/Router.tsx";
import type {AuthorDto} from "./api/generated-client.ts";

function App() {
    useEffect(() => {
        authorApi.getAuthors()
            .then((res: AuthorDto[]) => console.log(res))
            .catch((err: unknown) => console.error(err));
    }, []); // [] means this effect runs once when the component mounts

    return (
        <div>
            <Router />
        </div>
    );
}

export default App;
