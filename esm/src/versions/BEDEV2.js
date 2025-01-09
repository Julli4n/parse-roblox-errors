import { parseAnyError } from "../utils/parseAnyError.js";
export function parseBEDEV2ErrorFromJSON(json) {
    try {
        if (typeof json === "string") {
            // in some contextes, it can be a string
            return [
                {
                    message: json,
                },
            ];
        }
        else if (Array.isArray(json)) {
            return json.map((errorMessage) => ({
                message: errorMessage,
            }));
        }
        else {
            if ("errors" in json) {
                if (json.errors instanceof Array) {
                    const errors = json.errors.map((error) => ({
                        code: error.code,
                        message: error.message ?? "???",
                    }));
                    if ("code" in json) {
                        return [
                            {
                                code: json.code,
                                message: json.message ?? "???",
                                childErrors: errors,
                            },
                        ];
                    }
                    return errors;
                }
                else {
                    return Object.entries(json.errors).map(([index, value]) => ({
                        message: value.join(","),
                        field: index,
                    }));
                }
            }
            if ("error" in json) {
                if ("code" in json) {
                    return [
                        {
                            code: json.code,
                            message: json.error,
                        },
                    ];
                }
                else if ("error_description" in json) {
                    return [
                        {
                            code: json.error,
                            message: json.error_description,
                        },
                    ];
                }
                else if ("message" in json) {
                    return [
                        {
                            code: json.error,
                            message: json.message,
                            childErrors: "errorDetails" in json
                                ? json.errorDetails.map((error) => {
                                    return {
                                        type: error.errorDetailType,
                                        code: error.datastoreErrorCode,
                                    };
                                })
                                : [],
                        },
                    ];
                }
                else if ("reason_code" in json) {
                    return [{
                            code: json.reason_code,
                            message: json.error,
                        }];
                }
            }
            if ("message" in json) {
                if ("errorCode" in json) {
                    return [
                        {
                            code: json.errorCode,
                            message: json.message,
                        },
                    ];
                }
                else if ("code" in json) {
                    return [
                        {
                            code: json.code,
                            message: json.message,
                        },
                    ];
                }
                else if ("status" in json) {
                    return [
                        {
                            code: json.status,
                            message: json.message,
                        },
                    ];
                }
                else if ("status_code" in json) {
                    return [{
                            code: json.status_code,
                            message: json.message ?? "???",
                        }];
                }
            }
            if ("errorMessage" in json) {
                if ("errorType" in json) {
                    return [
                        {
                            code: json.errorType,
                            message: json.errorMessage ?? "???",
                        },
                    ];
                }
                else {
                    return [
                        {
                            code: json.errorCode ?? json.failureReason,
                            message: json.errorMessage,
                            field: json.field,
                            hint: json.hint ?? json.clientHint,
                        },
                    ];
                }
            }
            if ("Error" in json) {
                if ("Code" in json.Error && "Message" in json.Error) {
                    return [
                        {
                            code: json.Error.Code,
                            message: json.Error.Message,
                        },
                    ];
                }
            }
            if ("code" in json) {
                // nothing else..
                return [
                    {
                        code: json.code,
                        message: json.code?.toString() ?? "???",
                    },
                ];
            }
            else if ("ValidationErrors" in json) {
                return json.ValidationErrors.map(error => ({
                    code: error.Code,
                    message: error.Message,
                    field: error.FieldName,
                    fieldData: error.FieldData,
                }));
            }
            return [
                {
                    message: "Unknown Error",
                },
            ];
        }
    }
    catch {
        return [];
    }
}
export function parseBEDEV2ErrorFromString(text, contentType) {
    return parseAnyError(() => text.trim(), parseBEDEV2ErrorFromJSON, undefined, contentType);
}
export function parseBEDEV2Error(response) {
    return parseAnyError(() => response.clone().text().then((text) => text.trim()), parseBEDEV2ErrorFromJSON, response.headers);
}
export function parseBEDEV2ErrorFromStringAndHeaders(text, headers) {
    return parseAnyError(() => text.trim(), parseBEDEV2ErrorFromJSON, headers);
}
