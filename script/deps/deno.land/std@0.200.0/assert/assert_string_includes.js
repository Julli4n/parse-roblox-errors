"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertStringIncludes = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const assertion_error_js_1 = require("./assertion_error.js");
/**
 * Make an assertion that actual includes expected. If not
 * then throw.
 */
function assertStringIncludes(actual, expected, msg) {
    if (!actual.includes(expected)) {
        const msgSuffix = msg ? `: ${msg}` : ".";
        msg = `Expected actual: "${actual}" to contain: "${expected}"${msgSuffix}`;
        throw new assertion_error_js_1.AssertionError(msg);
    }
}
exports.assertStringIncludes = assertStringIncludes;
