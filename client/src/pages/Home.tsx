import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1 style={{ marginBottom: 12 }}>Welcome</h1>
            <ul>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/authors">Authors</Link></li>
                <li><Link to="/genres">Genres</Link></li>
            </ul>
        </div>
    );
}
