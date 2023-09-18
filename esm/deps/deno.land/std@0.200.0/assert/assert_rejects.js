// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import { AssertionError } from "./assertion_error.js";
import { assertIsError } from "./assert_is_error.js";
export async function assertRejects(fn, errorClassOrMsg, msgIncludesOrMsg, msg) {
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
    }
    else {
        msg = errorClassOrMsg;
    }
    let doesThrow = false;
    let isPromiseReturned = false;
    const msgSuffix = msg ? `: ${msg}` : ".";
    try {
        const possiblePromise = fn();
        if (possiblePromise &&
            typeof possiblePromise === "object" &&
            typeof possiblePromise.then === "function") {
            isPromiseReturned = true;
            await possiblePromise;
        }
    }
    catch (error) {
        if (!isPromiseReturned) {
            throw new AssertionError(`Function throws when expected to reject${msgSuffix}`);
        }
        if (ErrorClass) {
            if (error instanceof Error === false) {
                throw new AssertionError(`A non-Error object was rejected${msgSuffix}`);
            }
            assertIsError(error, ErrorClass, msgIncludes, msg);
        }
        err = error;
        doesThrow = true;
    }
    if (!doesThrow) {
        throw new AssertionError(`Expected function to reject${msgSuffix}`);
    }
    return err;
}
