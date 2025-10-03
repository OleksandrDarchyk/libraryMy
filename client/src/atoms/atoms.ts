import { atom } from "jotai";
import type {AuthorDto, BookDto, GenreDto} from "../api/generated-client.ts";

export const booksAtom = atom<BookDto[]>([]);
export const authorsAtom = atom<AuthorDto[]>([]);
export const genresAtom = atom<GenreDto[]>([]);

