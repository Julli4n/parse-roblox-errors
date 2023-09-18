"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertEquals = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const equal_js_1 = require("./equal.js");
const _format_js_1 = require("./_format.js");
const assertion_error_js_1 = require("./assertion_error.js");
const colors_js_1 = require("../fmt/colors.js");
const _diff_js_1 = require("./_diff.js");
const _constants_js_1 = require("./_constants.js");
/**
 * Make an assertion that `actual` and `expected` are equal, deeply. If not
 * deeply equal, then throw.
 *
 * Type parameter can be specified to ensure values under comparison have the same type.
 *
 * @example
 * ```ts
 * import { assertEquals } from "https://deno.land/std@$STD_VERSION/assert/assert_equals.ts";
 *
 * Deno.test("example", function (): void {
 *   assertEquals("world", "world");
 *   assertEquals({ hello: "world" }, { hello: "world" });
 * });
 * ```
 *
 * Note: formatter option is experimental and may be removed in the future.
 */
function assertEquals(actual, expected, msg, options = {}) {
    if ((0, equal_js_1.equal)(actual, expected)) {
        return;
    }
    const { formatter = _format_js_1.format } = options;
    const msgSuffix = msg ? `: ${msg}` : ".";
    let message = `Values are not equal${msgSuffix}`;
    const actualString = formatter(actual);
    const expectedString = formatter(expected);
    try {
        const stringDiff = (typeof actual === "string") &&
            (typeof expected === "string");
        const diffResult = stringDiff
            ? (0, _diff_js_1.diffstr)(actual, expected)
            : (0, _diff_js_1.diff)(actualString.split("\n"), expectedString.split("\n"));
        const diffMsg = (0, _diff_js_1.buildMessage)(diffResult, { stringDiff }).join("\n");
        message = `${message}\n${diffMsg}`;
    }
    catch {
        message = `${message}\n${(0, colors_js_1.red)(_constants_js_1.CAN_NOT_DISPLAY)} + \n\n`;
    }
    throw new assertion_error_js_1.AssertionError(message);
}
exports.assertEquals = assertEquals;
