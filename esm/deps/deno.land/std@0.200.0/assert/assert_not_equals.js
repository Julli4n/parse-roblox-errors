// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import { equal } from "./equal.js";
import { AssertionError } from "./assertion_error.js";
/**
 * Make an assertion that `actual` and `expected` are not equal, deeply.
 * If not then throw.
 *
 * Type parameter can be specified to ensure values under comparison have the same type.
 *
 * @example
 * ```ts
 * import { assertNotEquals } from "https://deno.land/std@$STD_VERSION/assert/assert_not_equals.ts";
 *
 * assertNotEquals<number>(1, 2)
 * ```
 */
export function assertNotEquals(actual, expected, msg) {
    if (!equal(actual, expected)) {
        return;
    }
    let actualString;
    let expectedString;
    try {
        actualString = String(actual);
    }
    catch {
        actualString = "[Cannot display]";
    }
    try {
        expectedString = String(expected);
    }
    catch {
        expectedString = "[Cannot display]";
    }
    const msgSuffix = msg ? `: ${msg}` : ".";
    throw new AssertionError(`Expected actual: ${actualString} not to be: ${expectedString}${msgSuffix}`);
}
