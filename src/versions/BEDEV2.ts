import { MIMEType } from "../deps.ts";

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
    errorDetails?: { errorDetailType: string; datastoreErrorCode: string }[];
};

type ChildError = { type: string; code: string };

export type BEDEV2Error = {
    code?: number | string;
    message: string;
    field?: string;
    hint?: string;
    childErrors?: ChildError[];
};

export async function parseBEDEV2Error(
    response: Response,
): Promise<BEDEV2Error[]> {
    const errors: BEDEV2Error[] = [];
    if (response.headers.has('x-roblox-system-reason')) {
        const reason = response.headers.get('x-roblox-system-reason')!;
        const reasonParsed = reason.match(/(.+?) \((.+?)\)/);
        if (reasonParsed) {
            errors.push({
                code: reasonParsed[2],
                message: reasonParsed[1],
            });
        } else {
            errors.push({
                message: reason,
            });
        }
    }
    try {
        const contentLength = response.headers.has("content-length")
            ? parseInt(response.headers.get("content-length")!)
            : 0;
        if (contentLength === 0) {
            return errors;
        }
        if (response.headers.has("content-type")) {
            const responseType = MIMEType.parse(
                response.headers.get("content-type")!,
            );
            if (responseType) {
                const responseTypeIsJson =  (responseType.type === "text" ||
                    responseType.type === "application") &&
                    (responseType.subtype === "json" ||
                    responseType.subtype.endsWith("+json"));

                if (responseTypeIsJson) {
                    // Content type is json, parse.
                    const json = await response.clone().text().then((text) =>
                        JSON.parse(text.trim())
                    ) as BEDEV2ErrorResponse;

                    if (typeof json === "string") {
                        // in some contextes, it can be a string
                        errors.push({
                            message: json,
                        });
                        return errors;
                    } else if (Array.isArray(json)) {
                        errors.push(...json.map((errorMessage) =>
                            ({
                                message: errorMessage,
                            })
                        ));
                        return errors;
                    } else {
                        if ("errors" in json) {
                            if (json.errors instanceof Array) {
                                errors.push(...json.errors.map((error) =>
                                    ({
                                        code: error.code,
                                        message: error.message ?? "???",
                                    })
                                ));
                                return errors;
                            } else {
                                errors.push(...Object.entries(
                                    (json.errors) as Record<string, string[]>,
                                ).map(([index, value]) =>
                                    ({
                                        message: value.join(","),
                                        field: index,
                                    })
                                ));
                                return errors;
                            }
                        }
                        if ("error" in json) {
                            if ("code" in json) {
                                errors.push({
                                    code: json.code,
                                    message: (json.error as string),
                                });
                                return errors;
                            } else if ("error_description" in json) {
                                errors.push({
                                    code: json.error,
                                    message: json.error_description!,
                                });
                                return errors;
                            } else if ("message" in json) {
                                errors.push({
                                    code: json.error,
                                    message: json.message!,
                                    childErrors: "errorDetails" in json
                                        ? json.errorDetails!.map((error) => {
                                            return {
                                                type: error.errorDetailType,
                                                code: error.datastoreErrorCode,
                                            };
                                        })
                                        : [],
                                });
                                return errors;
                            }
                        }

                        if ("message" in json) {
                            if ("errorCode" in json) {
                                errors.push({
                                    code: json.errorCode,
                                    message: json.message!,
                                });
                                return errors;
                            } else if ("code" in json) {
                                errors.push({
                                    code: json.code,
                                    message: json.message!,
                                });
                                return errors;
                            }
                        }

                        if ("errorMessage" in json) {
                            errors.push({
                                code: json.errorCode ?? json.failureReason,
                                message: json.errorMessage!,
                                field: json.field,
                                hint: json.hint ?? undefined,
                            });
                            return errors;
                        }

                        if ("Error" in json) {
                            if (
                                ("Code" in json.Error!) &&
                                ("Message" in json.Error!)
                            ) {
                                errors.push({
                                    code: json.Error.Code,
                                    message: json.Error.Message!,
                                });
                                return errors;
                            }
                        }

                        return [{
                            message: "Unknown Error",
                        }];
                    }
                } else if (responseType.type === "text") {
                    errors.push({
                        message: await response.clone().text(),
                    });
                    return errors;
                } else {
                    errors.push({
                        message: `<(${responseType?.type ?? "unknown"}/${responseType?.subtype ?? "unknown"
                            })-formatted Error>`,
                    });
                    return errors;
                }
            } else {
                errors.push({
                    message: await response.clone().text(),
                });
                return errors;
            }
        } else {
            // Send error with text because we don't have content-type
            errors.push(                {
                message: await response.clone().text(),
            });
            return errors;
        }
    } catch {
        return errors;
    }
}
