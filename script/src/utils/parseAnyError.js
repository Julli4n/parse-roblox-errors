"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAnyError = void 0;
const deps_js_1 = require("../deps.js");
const isResponseTypeJson_js_1 = require("./isResponseTypeJson.js");
async function parseAnyError(body, handleJSON, headers, contentType) {
    const errors = [];
    const robloxSystemReason = headers?.get("x-roblox-system-reason");
    if (robloxSystemReason) {
        const reasonParsed = robloxSystemReason.match(/(.+?) \((.+?)\)/);
        errors.push(reasonParsed
            ? { code: reasonParsed[2], message: reasonParsed[1] }
            : { message: robloxSystemReason });
    }
    const text = await body();
    const contentLength = headers && headers.has("content-length")
        ? parseInt(headers.get("content-length"), 10)
        : text.length;
    if (contentLength === 0)
        return errors;
    contentType = contentType ?? headers?.get("content-type");
    const responseType = deps_js_1.MIMEType.parse(contentType ?? "");
    if (!contentType || !responseType) {
        errors.push({ message: text });
        return errors;
    }
    if ((0, isResponseTypeJson_js_1.isResponseTypeJson)(responseType)) {
        // Content type is json, parse.
        errors.push(...handleJSON(JSON.parse(text)));
    }
    else if (responseType.type === "text") {
        errors.push({
            message: text,
        });
    }
    else {
        errors.push({
            message: `<(${responseType?.type ?? "unknown"}/${responseType?.subtype ?? "unknown"})-formatted Error>`,
        });
    }
    return errors;
}
exports.parseAnyError = parseAnyError;
