"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertionError = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
class AssertionError extends Error {
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
exports.AssertionError = AssertionError;
