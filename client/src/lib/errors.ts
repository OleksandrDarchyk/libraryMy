import { ApiException } from "../api/generated-client";

export function getErrorMessage(err: unknown): string {
    if (ApiException.isApiException(err)) {
        try {
            const body = err.response ? JSON.parse(err.response) : undefined;
            if (body?.title) return body.title;
        } catch { /* ignore */ }
        return err.message;
    }
    if (err instanceof Error) return err.message;
    return String(err);
}
