"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotStrictEquals = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const assertion_error_js_1 = require("./assertion_error.js");
const _format_js_1 = require("./_format.js");
/**
 * Make an assertion that `actual` and `expected` are not strictly equal.
 * If the values are strictly equal then throw.
 *
 * ```ts
 * import { assertNotStrictEquals } from "https://deno.land/std@$STD_VERSION/assert/assert_not_strict_equals.ts";
 *
 * assertNotStrictEquals(1, 1)
 * ```
 */
function assertNotStrictEquals(actual, expected, msg) {
    if (!Object.is(actual, expected)) {
        return;
    }
    const msgSuffix = msg ? `: ${msg}` : ".";
    throw new assertion_error_js_1.AssertionError(`Expected "actual" to be strictly unequal to: ${(0, _format_js_1.format)(actual)}${msgSuffix}\n`);
}
exports.assertNotStrictEquals = assertNotStrictEquals;
