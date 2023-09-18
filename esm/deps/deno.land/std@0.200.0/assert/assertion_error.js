// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
export class AssertionError extends Error {
    constructor(message) {
        super(message);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "AssertionError"
        });
    }
}
