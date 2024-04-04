import type { AnyError } from "../types.js";
import { parseAnyError } from "../utils/parseAnyError.js";
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
export declare function parseBEDEV1ErrorFromJSON(json: BEDEV1ErrorResponse): AnyError[];
export declare function parseBEDEV1ErrorFromString(text: string, contentType: string): ReturnType<typeof parseAnyError>;
export declare function parseBEDEV1Error(response: Response): ReturnType<typeof parseAnyError>;
export declare function parseBEDEV1ErrorFromStringAndHeaders(text: string, headers: Headers): ReturnType<typeof parseAnyError>;
export {};
