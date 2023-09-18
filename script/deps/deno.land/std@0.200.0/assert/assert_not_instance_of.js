"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotInstanceOf = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const assert_false_js_1 = require("./assert_false.js");
/**
 * Make an assertion that `obj` is not an instance of `type`.
 * If so, then throw.
 */
function assertNotInstanceOf(actual, 
// deno-lint-ignore no-explicit-any
unexpectedType, msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    msg =
        `Expected object to not be an instance of "${typeof unexpectedType}"${msgSuffix}`;
    (0, assert_false_js_1.assertFalse)(actual instanceof unexpectedType, msg);
}
exports.assertNotInstanceOf = assertNotInstanceOf;
