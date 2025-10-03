import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Books from "../pages/Books";
import Authors from "../pages/Authors";
import Genres from "../pages/Genres";
import BookDetails from "../pages/BookDetails";
import AuthorDetails from "../pages/AuthorDetails";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import NewAuthor from "../pages/NewAuthor";
import NewBook from "../pages/NewBook";
import NewGenre from "../pages/NewGenre";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px" }}>
                <Navigation />
                {children}
            </div>
        </div>
    );
}

const router = createBrowserRouter([
    { path: "/", element: <Layout><Home /></Layout> },
    { path: "/books", element: <Layout><Books /></Layout> },
    { path: "/books/new", element: <Layout><NewBook /></Layout> },
    { path: "/books/:id", element: <Layout><BookDetails /></Layout> },
    { path: "/authors", element: <Layout><Authors /></Layout> },
    { path: "/authors/new", element: <Layout><NewAuthor /></Layout> },
    { path: "/authors/:id", element: <Layout><AuthorDetails /></Layout> },
    { path: "/genres", element: <Layout><Genres /></Layout> },
    { path: "/genres/new", element: <Layout><NewGenre /></Layout> },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
