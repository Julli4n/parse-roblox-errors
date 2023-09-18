import { type AnyError } from "../types.js";
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
export declare function parseBEDEV1ErrorFromString(text: string, contentType: string): Promise<AnyError[]>;
export declare function parseBEDEV1Error(response: Response): Promise<AnyError[]>;
export {};
