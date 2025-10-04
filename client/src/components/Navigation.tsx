import { Link, useLocation } from "react-router-dom";

const linkStyle: React.CSSProperties = { textDecoration: "none", color: "#a3aedc" };
const itemStyle: React.CSSProperties = { marginRight: 12 };

export default function Navigation() {
    const { pathname } = useLocation();
    return (
        <nav style={{ margin: "16px 0" }}>
            <Link to="/" style={{ ...linkStyle, ...itemStyle, fontWeight: pathname === "/" ? 600 : 400 }}>
                Home
            </Link>
            <Link to="/books" style={{ ...linkStyle, ...itemStyle, fontWeight: pathname.startsWith("/books") ? 600 : 400 }}>
                Books
            </Link>
            <Link to="/authors" style={{ ...linkStyle, ...itemStyle, fontWeight: pathname.startsWith("/authors") ? 600 : 400 }}>
                Authors
            </Link>
            <Link to="/genres" style={{ ...linkStyle, fontWeight: pathname.startsWith("/genres") ? 600 : 400 }}>
                Genres
            </Link>
        </nav>
    );
}
