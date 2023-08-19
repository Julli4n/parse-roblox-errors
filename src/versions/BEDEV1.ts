import { MIMEType } from "../deps.ts";

type BEDEV1ErrorResponse = string | {
    errors: {
        code: number;
        message: string;
        userFacingMessage?: string;
        field?: string;
        fieldData?: string;
        retryable?: boolean;
        hint?: string;
    }[];
} | {
    code: string | number;
    message: string;
};

type ChildError = { type: string; code: string };

export type BEDEV1Error = {
    code?: string | number;
    message: string;
    childErrors?: ChildError[];
    field?: string;
    fieldData?: string;
};

export async function parseBEDEV1Error(
    response: Response,
): Promise<BEDEV1Error[]> {
    const contentLength = response.headers.has("content-length")
        ? parseInt(response.headers.get("content-length")!)
        : 0;
    if (contentLength === 0) {
        return [];
    }
    if (response.headers.has("content-type")) {
        const responseType = MIMEType.parse(
            response.headers.get("content-type")!,
        );

        if (responseType) {
            const responseTypeIsJson = (responseType.type === "text" ||
                responseType.type === "application") &&
                (responseType.subtype === "json" ||
                responseType.subtype.endsWith("+json"));

            if (responseType.isHTML()) {
                // We are not going to parse from HTML.
                return [{
                    message: "<HTML-formatted Error>",
                }];
            } else if (responseTypeIsJson) {
                // Content type is json, parse.
                const json = await response.clone().text().then((text) =>
                    JSON.parse(text.trim())
                ) as BEDEV1ErrorResponse;
                if (typeof json === "string") {
                    // in some context, it can be a stinrg
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
            } else {
                return [{
                    message: `<(${responseType?.type ?? "unknown"}/${responseType?.subtype ?? "unknown"
                        })-formatted Error>`,
                }];
            }
        } else {
            return [{
                message: await response.clone().text(),
            }];
        }
    } else {
        // Send error with text because we don't have content-type
        return [
            {
                message: await response.clone().text(),
            },
        ];
    }
}
