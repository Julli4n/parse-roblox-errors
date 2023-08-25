import { MIMEType } from "../deps.ts";

export function isResponseTypeJson(responseType: MIMEType) {
    return (responseType.type === "text" ||
        responseType.type === "application") &&
        (responseType.subtype === "json" ||
            responseType.subtype.endsWith("+json"));
}
