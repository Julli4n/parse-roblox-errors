"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fail = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const assert_js_1 = require("./assert.js");
/**
 * Forcefully throws a failed assertion
 */
function fail(msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    (0, assert_js_1.assert)(false, `Failed assertion${msgSuffix}`);
}
exports.fail = fail;
