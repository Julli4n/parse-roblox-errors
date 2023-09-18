export function responseFromJSON(data, headers) {
    const json = JSON.stringify(data);
    return new Response(json, {
        headers: {
            "content-type": "application/json",
            "content-length": json.length.toString(),
            ...headers,
        },
    });
}
