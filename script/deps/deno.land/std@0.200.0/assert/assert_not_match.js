"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotMatch = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const assertion_error_js_1 = require("./assertion_error.js");
/**
 * Make an assertion that `actual` not match RegExp `expected`. If match
 * then throw.
 */
function assertNotMatch(actual, expected, msg) {
    if (expected.test(actual)) {
        const msgSuffix = msg ? `: ${msg}` : ".";
        msg =
            `Expected actual: "${actual}" to not match: "${expected}"${msgSuffix}`;
        throw new assertion_error_js_1.AssertionError(msg);
    }
}
exports.assertNotMatch = assertNotMatch;
