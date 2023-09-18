import { MIMEType } from "../deps.js";
import { isResponseTypeJson } from "./isResponseTypeJson.js";
export async function parseAnyError(body, handleJSON, headers, contentType) {
    const errors = [];
    if (headers?.has("x-roblox-system-reason")) {
        const reason = headers.get("x-roblox-system-reason");
        const reasonParsed = reason.match(/(.+?) \((.+?)\)/);
        if (reasonParsed) {
            errors.push({
                code: reasonParsed[2],
                message: reasonParsed[1],
            });
        }
        else {
            errors.push({
                message: reason,
            });
        }
    }
    const text = body();
    let length = 0;
    if (headers && headers.has("content-length")) {
        length = parseInt(headers.get("content-length"), 10);
    }
    else {
        length = (await text).length;
    }
    if (length === 0) {
        return errors;
    }
    const type = contentType ?? headers?.get("content-type");
    const responseType = MIMEType.parse(type ?? "");
    if (!type || !responseType) {
        errors.push({
            message: await text,
        });
        return errors;
    }
    if (isResponseTypeJson(responseType)) {
        // Content type is json, parse.
        errors.push(...handleJSON(JSON.parse(await text)));
    }
    else if (responseType.type === "text") {
        errors.push({
            message: await text,
        });
    }
    else {
        errors.push({
            message: `<(${responseType?.type ?? "unknown"}/${responseType?.subtype ?? "unknown"})-formatted Error>`,
        });
    }
    return errors;
}
