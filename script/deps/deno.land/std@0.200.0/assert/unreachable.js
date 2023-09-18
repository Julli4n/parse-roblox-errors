"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unreachable = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const assertion_error_js_1 = require("./assertion_error.js");
/** Use this to assert unreachable code. */
function unreachable() {
    throw new assertion_error_js_1.AssertionError("unreachable");
}
exports.unreachable = unreachable;
