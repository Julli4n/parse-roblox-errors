// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import { AssertionError } from "./assertion_error.js";
/** Use this to stub out methods that will throw when invoked. */
export function unimplemented(msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    throw new AssertionError(`Unimplemented${msgSuffix}`);
}
