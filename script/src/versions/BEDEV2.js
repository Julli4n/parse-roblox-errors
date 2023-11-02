"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBEDEV2ErrorFromStringAndHeaders = exports.parseBEDEV2Error = exports.parseBEDEV2ErrorFromString = exports.parseBEDEV2ErrorFromJSON = void 0;
const parseAnyError_js_1 = require("../utils/parseAnyError.js");
function parseBEDEV2ErrorFromJSON(json) {
    try {
        if (typeof json === "string") {
            // in some contextes, it can be a string
            return [{
                    message: json,
                }];
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
                    return Object.entries((json.errors)).map(([index, value]) => ({
                        message: value.join(","),
                        field: index,
                    }));
                }
            }
            if ("error" in json) {
                if ("code" in json) {
                    return [{
                            code: json.code,
                            message: json.error,
                        }];
                }
                else if ("error_description" in json) {
                    return [{
                            code: json.error,
                            message: json.error_description,
                        }];
                }
                else if ("message" in json) {
                    return [{
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
                        }];
                }
            }
            if ("message" in json) {
                if ("errorCode" in json) {
                    return [{
                            code: json.errorCode,
                            message: json.message,
                        }];
                }
                else if ("code" in json) {
                    return [{
                            code: json.code,
                            message: json.message,
                        }];
                }
                else if ("status" in json) {
                    return [{
                            code: json.status,
                            message: json.message,
                        }];
                }
            }
            if ("errorMessage" in json) {
                return [{
                        code: json.errorCode ?? json.failureReason,
                        message: json.errorMessage,
                        field: json.field,
                        hint: json.hint ?? undefined,
                    }];
            }
            if ("Error" in json) {
                if (("Code" in json.Error) &&
                    ("Message" in json.Error)) {
                    return [{
                            code: json.Error.Code,
                            message: json.Error.Message,
                        }];
                }
            }
            if ("code" in json) {
                // nothing else..
                return [{
                        code: json.code,
                        message: json.code?.toString() ?? "???",
                    }];
            }
            return [{
                    message: "Unknown Error",
                }];
        }
    }
    catch {
        return [];
    }
}
exports.parseBEDEV2ErrorFromJSON = parseBEDEV2ErrorFromJSON;
function parseBEDEV2ErrorFromString(text, contentType) {
    return (0, parseAnyError_js_1.parseAnyError)(() => text.trim(), parseBEDEV2ErrorFromJSON, undefined, contentType);
}
exports.parseBEDEV2ErrorFromString = parseBEDEV2ErrorFromString;
function parseBEDEV2Error(response) {
    return (0, parseAnyError_js_1.parseAnyError)(() => response.clone().text().then((text) => text.trim()), parseBEDEV2ErrorFromJSON, response.headers);
}
exports.parseBEDEV2Error = parseBEDEV2Error;
function parseBEDEV2ErrorFromStringAndHeaders(text, headers) {
    return (0, parseAnyError_js_1.parseAnyError)(() => text.trim(), parseBEDEV2ErrorFromJSON, headers);
}
exports.parseBEDEV2ErrorFromStringAndHeaders = parseBEDEV2ErrorFromStringAndHeaders;
