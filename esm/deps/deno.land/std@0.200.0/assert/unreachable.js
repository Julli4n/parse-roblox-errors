// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import { AssertionError } from "./assertion_error.js";
/** Use this to assert unreachable code. */
export function unreachable() {
    throw new AssertionError("unreachable");
}
