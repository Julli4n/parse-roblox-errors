"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertArrayIncludes = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const equal_js_1 = require("./equal.js");
const _format_js_1 = require("./_format.js");
const assertion_error_js_1 = require("./assertion_error.js");
/**
 * Make an assertion that `actual` includes the `expected` values.
 * If not then an error will be thrown.
 *
 * Type parameter can be specified to ensure values under comparison have the same type.
 *
 * @example
 * ```ts
 * import { assertArrayIncludes } from "https://deno.land/std@$STD_VERSION/assert/assert_array_includes.ts";
 *
 * assertArrayIncludes<number>([1, 2], [2])
 * ```
 */
function assertArrayIncludes(actual, expected, msg) {
    const missing = [];
    for (let i = 0; i < expected.length; i++) {
        let found = false;
        for (let j = 0; j < actual.length; j++) {
            if ((0, equal_js_1.equal)(expected[i], actual[j])) {
                found = true;
                break;
            }
        }
        if (!found) {
            missing.push(expected[i]);
        }
    }
    if (missing.length === 0) {
        return;
    }
    const msgSuffix = msg ? `: ${msg}` : ".";
    msg = `Expected actual: "${(0, _format_js_1.format)(actual)}" to include: "${(0, _format_js_1.format)(expected)}"${msgSuffix}\nmissing: ${(0, _format_js_1.format)(missing)}`;
    throw new assertion_error_js_1.AssertionError(msg);
}
exports.assertArrayIncludes = assertArrayIncludes;
