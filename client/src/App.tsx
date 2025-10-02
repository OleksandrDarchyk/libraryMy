import { useEffect } from "react";
import { authorApi } from "./api/client.ts";
import Router from "./app/Router.tsx";

function App() {
    useEffect(() => {
        authorApi.getAuthors()
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }, []); // [] means this effect runs once when the component mounts

    return (
        <div>
            <Router />
        </div>
    );
}

export default App;
