import type { AnyError } from "../types.js";
import { parseAnyError } from "../utils/parseAnyError.js";
type BEDEV2ErrorResponse = string | string[] | {
    errors?: {
        code?: number | string;
        message?: string;
    }[] | Record<string, string[]>;
} | {
    error?: string;
    error_description?: string;
} | {
    code?: number | string;
    message?: string;
    errors?: {
        code?: number | string;
        message?: string;
        field?: string;
    }[];
} | {
    error?: string;
    code?: number;
    message?: string;
} | {
    errorCode?: string;
    errorMessage?: string;
    failureReason?: number;
    field?: string;
    hint?: string | null;
    clientHint?: string | null;
} | {
    errorCode?: number;
    message?: string;
} | {
    Error?: {
        Code?: number;
        Message?: string;
    };
} | {
    error?: string;
    message?: string;
    errorDetails?: {
        errorDetailType: string;
        datastoreErrorCode: string;
    }[];
} | {
    status?: string;
    message?: string;
} | {
    errorType: string;
    errorMessage?: string;
} | {
    status_code?: number;
    message?: string;
} | {
    ValidationErrors: {
        Code: number;
        Message: string;
        FieldName: string;
        FieldData: string;
    }[];
};
export declare function parseBEDEV2ErrorFromJSON(json: BEDEV2ErrorResponse): AnyError[];
export declare function parseBEDEV2ErrorFromString(text: string, contentType: string): ReturnType<typeof parseAnyError>;
export declare function parseBEDEV2Error(response: Response): ReturnType<typeof parseAnyError>;
export declare function parseBEDEV2ErrorFromStringAndHeaders(text: string, headers: Headers): ReturnType<typeof parseAnyError>;
export {};