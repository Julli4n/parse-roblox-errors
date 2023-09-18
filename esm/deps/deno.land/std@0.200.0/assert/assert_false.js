// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import { AssertionError } from "./assertion_error.js";
export function assertFalse(expr, msg = "") {
    if (expr) {
        throw new AssertionError(msg);
    }
}
