"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFromJSON = void 0;
function responseFromJSON(data, headers) {
    const json = JSON.stringify(data);
    return new Response(json, {
        headers: {
            "content-type": "application/json",
            "content-length": json.length.toString(),
            ...headers,
        },
    });
}
exports.responseFromJSON = responseFromJSON;
