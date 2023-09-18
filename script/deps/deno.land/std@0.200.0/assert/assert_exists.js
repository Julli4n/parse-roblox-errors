"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertExists = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const assertion_error_js_1 = require("./assertion_error.js");
/**
 * Make an assertion that actual is not null or undefined.
 * If not then throw.
 */
function assertExists(actual, msg) {
    if (actual === undefined || actual === null) {
        const msgSuffix = msg ? `: ${msg}` : ".";
        msg =
            `Expected actual: "${actual}" to not be null or undefined${msgSuffix}`;
        throw new assertion_error_js_1.AssertionError(msg);
    }
}
exports.assertExists = assertExists;
