"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBEDEV1ErrorFromStringAndHeaders = exports.parseBEDEV1Error = exports.parseBEDEV1ErrorFromString = exports.parseBEDEV1ErrorFromJSON = void 0;
const parseAnyError_js_1 = require("../utils/parseAnyError.js");
function parseBEDEV1ErrorFromJSON(json) {
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
exports.parseBEDEV1ErrorFromJSON = parseBEDEV1ErrorFromJSON;
function parseBEDEV1ErrorFromString(text, contentType) {
    return (0, parseAnyError_js_1.parseAnyError)(() => text.trim(), parseBEDEV1ErrorFromJSON, undefined, contentType);
}
exports.parseBEDEV1ErrorFromString = parseBEDEV1ErrorFromString;
function parseBEDEV1Error(response) {
    return (0, parseAnyError_js_1.parseAnyError)(() => response.text().then((text) => text.trim()), parseBEDEV1ErrorFromJSON, response.headers);
}
exports.parseBEDEV1Error = parseBEDEV1Error;
function parseBEDEV1ErrorFromStringAndHeaders(text, headers) {
    return (0, parseAnyError_js_1.parseAnyError)(() => text.trim(), parseBEDEV1ErrorFromJSON, headers);
}
exports.parseBEDEV1ErrorFromStringAndHeaders = parseBEDEV1ErrorFromStringAndHeaders;
