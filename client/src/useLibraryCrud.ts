import { useAtom } from "jotai";
import { authorsAtom, booksAtom, genresAtom } from "./atoms/atoms";

import {
    type CreateAuthorRequestDto,
    type CreateBookRequestDto,
    type CreateGenreRequestDto,
    type UpdateAuthorRequestDto,
    type UpdateBookRequestDto,
    type UpdateGenreRequestDto,
} from "./api/generated-client";

import { authorApi, bookApi, genreApi } from "./api/client";
import customCatch from "./customCatch";
import toast from "react-hot-toast";

export default function useLibraryCrud() {
    const [, setAuthors] = useAtom(authorsAtom);
    const [, setBooks] = useAtom(booksAtom);
    const [, setGenres] = useAtom(genresAtom);

    async function getAuthors(): Promise<void> {
        try {
            setAuthors(await authorApi.getAuthors());
        } catch (e: unknown) {
            customCatch(e);
        }
    }

    async function getBooks(): Promise<void> {
        try {
            setBooks(await bookApi.getBooks());
        } catch (e: unknown) {
            customCatch(e);
        }
    }

    async function getGenres(): Promise<void> {
        try {
            setGenres(await genreApi.getGenres());
        } catch (e: unknown) {
            customCatch(e);
        }
    }

    async function createAuthor(dto: CreateAuthorRequestDto) {
        try {
            const result = await authorApi.createAuthor(dto);
            setAuthors(prev => [...prev, result]);
            toast.success("Author created successfully");
            return result;
        } catch (e: unknown) {
            customCatch(e);
        }
    }

    async function createBook(dto: CreateBookRequestDto) {
        try {
            const result = await bookApi.createBook(dto);
            setBooks(prev => [...prev, result]);
            toast.success("Book created successfully");
            return result;
        } catch (e: unknown) {
            customCatch(e);
        }
    }

    async function createGenre(dto: CreateGenreRequestDto) {
        try {
            const result = await genreApi.createGenre(dto);
            setGenres(prev => [...prev, result]);
            toast.success("Genre created successfully");
            return result;
        } catch (e: unknown) {
            customCatch(e);
        }
    }

    async function updateAuthor(id: string, dto: UpdateAuthorRequestDto) {
        try {
            const result = await authorApi.updateAuthor(id, dto);
            setAuthors(prev => prev.map(a => (a.id === result.id ? result : a)));
            toast.success("Author updated successfully");
            return result;
        } catch (e: unknown) {
            customCatch(e);
        }
    }

    async function updateBook(id: string, dto: UpdateBookRequestDto) {
        try {
            const result = await bookApi.updateBook(id, dto);
            setBooks(prev => prev.map(b => (b.id === result.id ? result : b)));
            toast.success("Book updated successfully");
            return result;
        } catch (e: unknown) {
            customCatch(e);
        }
    }

    async function updateGenre(id: string, dto: UpdateGenreRequestDto) {
        try {
            const result = await genreApi.updateGenre(id, dto);
            setGenres(prev => prev.map(g => (g.id === result.id ? result : g)));
            toast.success("Genre updated successfully");
            return result;
        } catch (e: unknown) {
            customCatch(e);
        }
    }

    async function deleteAuthor(id: string) {
        try {
            await authorApi.deleteAuthor(id);
            setAuthors(prev => prev.filter(a => a.id !== id));
            toast.success("Author deleted successfully");
        } catch (e: unknown) {
            customCatch(e);
        }
    }

    async function deleteBook(id: string) {
        try {
            await bookApi.deleteBook(id);
            setBooks(prev => prev.filter(b => b.id !== id));
            toast.success("Book deleted successfully");
        } catch (e: unknown) {
            customCatch(e);
        }
    }

    async function deleteGenre(id: string) {
        try {
            await genreApi.deleteGenre(id);
            setGenres(prev => prev.filter(g => g.id !== id));
            toast.success("Genre deleted successfully");
        } catch (e: unknown) {
            customCatch(e);
        }
    }

    return {
        getAuthors,
        getBooks,
        getGenres,
        createAuthor,
        createBook,
        createGenre,
        updateAuthor,
        updateBook,
        updateGenre,
        deleteAuthor,
        deleteBook,
        deleteGenre,
    };
}
