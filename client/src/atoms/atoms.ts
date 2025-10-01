import {atom} from "jotai/vanilla/atom";

import type {AuthorResponseDto, BookResponseDto, GenreResponseDto} from "../generated-client.ts";

export const booksAtom = atom<BookResponseDto[]>([]);
export const authorsAtom = atom<AuthorResponseDto[]>([]);
export const genresAtom = atom<GenreResponseDto[]>([]);

