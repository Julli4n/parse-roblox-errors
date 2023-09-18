"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertThrows = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const assert_is_error_js_1 = require("./assert_is_error.js");
const assertion_error_js_1 = require("./assertion_error.js");
function assertThrows(fn, errorClassOrMsg, msgIncludesOrMsg, msg) {
    // deno-lint-ignore no-explicit-any
    let ErrorClass = undefined;
    let msgIncludes = undefined;
    let err;
    if (typeof errorClassOrMsg !== "string") {
        if (errorClassOrMsg === undefined ||
            errorClassOrMsg.prototype instanceof Error ||
            errorClassOrMsg.prototype === Error.prototype) {
            // deno-lint-ignore no-explicit-any
            ErrorClass = errorClassOrMsg;
            msgIncludes = msgIncludesOrMsg;
        }
        else {
            msg = msgIncludesOrMsg;
        }
    }
    else {
        msg = errorClassOrMsg;
    }
    let doesThrow = false;
    const msgSuffix = msg ? `: ${msg}` : ".";
    try {
        fn();
    }
    catch (error) {
        if (ErrorClass) {
            if (error instanceof Error === false) {
                throw new assertion_error_js_1.AssertionError(`A non-Error object was thrown${msgSuffix}`);
            }
            (0, assert_is_error_js_1.assertIsError)(error, ErrorClass, msgIncludes, msg);
        }
        err = error;
        doesThrow = true;
    }
    if (!doesThrow) {
        msg = `Expected function to throw${msgSuffix}`;
        throw new assertion_error_js_1.AssertionError(msg);
    }
    return err;
}
exports.assertThrows = assertThrows;
