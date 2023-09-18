// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
/** A library of assertion functions.
 * If the assertion is false an `AssertionError` will be thrown which will
 * result in pretty-printed diff of failing assertion.
 *
 * This module is browser compatible, but do not rely on good formatting of
 * values for AssertionError messages in browsers.
 *
 * @module
 */
export * from "./assert_almost_equals.js";
export * from "./assert_array_includes.js";
export * from "./assert_equals.js";
export * from "./assert_exists.js";
export * from "./assert_false.js";
export * from "./assert_instance_of.js";
export * from "./assert_is_error.js";
export * from "./assert_match.js";
export * from "./assert_not_equals.js";
export * from "./assert_not_instance_of.js";
export * from "./assert_not_match.js";
export * from "./assert_not_strict_equals.js";
export * from "./assert_object_match.js";
export * from "./assert_rejects.js";
export * from "./assert_strict_equals.js";
export * from "./assert_string_includes.js";
export * from "./assert_throws.js";
export * from "./assert.js";
export * from "./assertion_error.js";
export * from "./equal.js";
export * from "./fail.js";
export * from "./unimplemented.js";
export * from "./unreachable.js";
