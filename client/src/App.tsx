import Home from "./pages/Home.tsx";
import { useEffect } from "react";
import { authorApi } from "./app/baseURL.ts";

function App() {
    useEffect(() => {
        authorApi.getAuthors()
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }, []); // [] means this effect runs once when the component mounts

    return (
        <div>
            <Home />
        </div>
    );
}

export default App;
