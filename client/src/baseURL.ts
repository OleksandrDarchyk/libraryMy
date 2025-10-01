
import {AuthorClient, BookClient, GenreClient} from "./generated-client.ts";
const isProduction = import.meta.env.PROD;

const dev = "http://localhost:5050";
const prod = "https://library-backend-one.fly.dev";

export const finalUrl = isProduction ? prod : dev;

export const bookApi = new BookClient(finalUrl);
export const authorApi = new AuthorClient(finalUrl);
export const genreApi = new GenreClient(finalUrl);
