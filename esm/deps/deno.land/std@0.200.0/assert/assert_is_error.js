// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import { AssertionError } from "./assertion_error.js";
import { stripColor } from "../fmt/colors.js";
/**
 * Make an assertion that `error` is an `Error`.
 * If not then an error will be thrown.
 * An error class and a string that should be included in the
 * error message can also be asserted.
 */
export function assertIsError(error, 
// deno-lint-ignore no-explicit-any
ErrorClass, msgIncludes, msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    if (error instanceof Error === false) {
        throw new AssertionError(`Expected "error" to be an Error object${msgSuffix}}`);
    }
    if (ErrorClass && !(error instanceof ErrorClass)) {
        msg = `Expected error to be instance of "${ErrorClass.name}", but was "${typeof error === "object" ? error?.constructor?.name : "[not an object]"}"${msgSuffix}`;
        throw new AssertionError(msg);
    }
    if (msgIncludes && (!(error instanceof Error) ||
        !stripColor(error.message).includes(stripColor(msgIncludes)))) {
        msg = `Expected error message to include "${msgIncludes}", but got "${error instanceof Error ? error.message : "[not an Error]"}"${msgSuffix}`;
        throw new AssertionError(msg);
    }
}
