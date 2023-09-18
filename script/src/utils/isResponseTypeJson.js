"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResponseTypeJson = void 0;
function isResponseTypeJson(responseType) {
    return (responseType.type === "text" ||
        responseType.type === "application") &&
        (responseType.subtype === "json" ||
            responseType.subtype.endsWith("+json"));
}
exports.isResponseTypeJson = isResponseTypeJson;
