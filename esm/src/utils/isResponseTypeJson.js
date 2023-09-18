export function isResponseTypeJson(responseType) {
    return (responseType.type === "text" ||
        responseType.type === "application") &&
        (responseType.subtype === "json" ||
            responseType.subtype.endsWith("+json"));
}
