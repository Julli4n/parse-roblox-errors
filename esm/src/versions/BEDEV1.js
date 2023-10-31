import { parseAnyError } from "../utils/parseAnyError.js";
export function parseBEDEV1ErrorFromJSON(json) {
    if (typeof json === "string") {
        // in some context, it can be a string
        return [{
                message: json,
            }];
    }
    else if ("code" in json) {
        return [{
                code: json?.code ?? undefined,
                message: json?.message,
            }];
    }
    else {
        return json?.errors ?? [];
    }
}
export function parseBEDEV1ErrorFromString(text, contentType) {
    return parseAnyError(() => text.trim(), parseBEDEV1ErrorFromJSON, undefined, contentType);
}
export function parseBEDEV1Error(response) {
    return parseAnyError(() => response.text().then((text) => text.trim()), parseBEDEV1ErrorFromJSON, response.headers);
}
export function parseBEDEV1ErrorFromStringAndHeaders(text, headers) {
    return parseAnyError(() => text.trim(), parseBEDEV1ErrorFromJSON, headers);
}
