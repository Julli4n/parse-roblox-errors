import { type AnyError } from "../types.ts";
import { parseAnyError } from "../utils/parseAnyError.ts";

type BEDEV1ErrorResponse = string | {
    errors: {
        code: number;
        message: string;
        userFacingMessage?: string;
        field?: string;
        fieldData?: string;
        retryable?: boolean;
        hint?: string | null;
    }[];
} | {
    code: string | number;
    message: string;
};

export function parseBEDEV1ErrorFromJSON(
    json: BEDEV1ErrorResponse,
): AnyError[] {
    if (typeof json === "string") {
        // in some context, it can be a string
        return [{
            message: json,
        }];
    } else if ("code" in json) {
        return [{
            code: json?.code ?? undefined,
            message: json?.message,
        }];
    } else {
        return json?.errors ?? [];
    }
}

export function parseBEDEV1ErrorFromString(text: string, contentType: string) {
    return parseAnyError(
        () => text.trim(),
        parseBEDEV1ErrorFromJSON,
        undefined,
        contentType,
    );
}

export function parseBEDEV1Error(response: Response) {
    return parseAnyError(
        () => response.text().then((text) => text.trim()),
        parseBEDEV1ErrorFromJSON,
        response.headers,
    );
}
