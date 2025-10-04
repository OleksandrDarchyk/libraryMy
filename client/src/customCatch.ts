

import toast from "react-hot-toast";
import {ApiException} from "./api/generated-client.ts";
import type {ProblemDetails} from "./ProblemDetails.ts";

export default function customCatch(e: unknown) {
    if (e instanceof ApiException) {
        try {
            const problemDetails = JSON.parse(e.response) as ProblemDetails;
            toast.error(problemDetails.title);
            console.error("API error:", problemDetails.title);
        } catch {
            toast.error("Unexpected API error");
            console.error("Invalid API response", e);
        }
    } else if (e instanceof Error) {
        toast.error(e.message);
        console.error("General error:", e.message);
    } else {
        toast.error("Unknown error");
        console.error("Unknown error:", e);
    }
}
