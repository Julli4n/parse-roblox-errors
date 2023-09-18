"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unimplemented = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const assertion_error_js_1 = require("./assertion_error.js");
/** Use this to stub out methods that will throw when invoked. */
function unimplemented(msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    throw new assertion_error_js_1.AssertionError(`Unimplemented${msgSuffix}`);
}
exports.unimplemented = unimplemented;
