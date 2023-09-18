"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertFalse = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const assertion_error_js_1 = require("./assertion_error.js");
function assertFalse(expr, msg = "") {
    if (expr) {
        throw new assertion_error_js_1.AssertionError(msg);
    }
}
exports.assertFalse = assertFalse;
