// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import { AssertionError } from "./assertion_error.js";
/**
 * Make an assertion that `actual` not match RegExp `expected`. If match
 * then throw.
 */
export function assertNotMatch(actual, expected, msg) {
    if (expected.test(actual)) {
        const msgSuffix = msg ? `: ${msg}` : ".";
        msg =
            `Expected actual: "${actual}" to not match: "${expected}"${msgSuffix}`;
        throw new AssertionError(msg);
    }
}
