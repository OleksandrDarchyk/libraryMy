import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home.tsx";
import AuthorsList from "../pages/authors/AuthorsList.tsx";
import AuthorsEdit from "../pages/authors/AuthorEdit.tsx";
import BooksList from "../pages/books/BooksList.tsx";
import BookEdit from "../pages/books/BookEdit.tsx";
import GenresList from "../pages/genres/GenresList.tsx";
import GenreEdit from "../pages/genres/GenreEdit.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/authors",
        element: <AuthorsList />,
    },
    {
        path: "/authors/:id",
        element: <AuthorsEdit />,
    },
    {
        path: "/books",
        element: <BooksList />,
    },
    {
        path: "/books/:id",
        element: <BookEdit />,
    },
    {
        path: "/genres",
        element: <GenresList />,
    },
    {
        path: "/genres/:id",
        element: <GenreEdit />,
    },
]);
// RouterProvider makes it possible to switch between pages (routes).
export default function App() {
    return <RouterProvider router={router} />;
}
