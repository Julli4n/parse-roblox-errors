"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertIsError = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const assertion_error_js_1 = require("./assertion_error.js");
const colors_js_1 = require("../fmt/colors.js");
/**
 * Make an assertion that `error` is an `Error`.
 * If not then an error will be thrown.
 * An error class and a string that should be included in the
 * error message can also be asserted.
 */
function assertIsError(error, 
// deno-lint-ignore no-explicit-any
ErrorClass, msgIncludes, msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    if (error instanceof Error === false) {
        throw new assertion_error_js_1.AssertionError(`Expected "error" to be an Error object${msgSuffix}}`);
    }
    if (ErrorClass && !(error instanceof ErrorClass)) {
        msg = `Expected error to be instance of "${ErrorClass.name}", but was "${typeof error === "object" ? error?.constructor?.name : "[not an object]"}"${msgSuffix}`;
        throw new assertion_error_js_1.AssertionError(msg);
    }
    if (msgIncludes && (!(error instanceof Error) ||
        !(0, colors_js_1.stripColor)(error.message).includes((0, colors_js_1.stripColor)(msgIncludes)))) {
        msg = `Expected error message to include "${msgIncludes}", but got "${error instanceof Error ? error.message : "[not an Error]"}"${msgSuffix}`;
        throw new assertion_error_js_1.AssertionError(msg);
    }
}
exports.assertIsError = assertIsError;
