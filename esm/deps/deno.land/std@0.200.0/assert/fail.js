// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import { assert } from "./assert.js";
/**
 * Forcefully throws a failed assertion
 */
export function fail(msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    assert(false, `Failed assertion${msgSuffix}`);
}
