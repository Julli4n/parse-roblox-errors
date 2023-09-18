/**
 * Make an assertion that `actual` and `expected` are not strictly equal.
 * If the values are strictly equal then throw.
 *
 * ```ts
 * import { assertNotStrictEquals } from "https://deno.land/std@$STD_VERSION/assert/assert_not_strict_equals.ts";
 *
 * assertNotStrictEquals(1, 1)
 * ```
 */
export declare function assertNotStrictEquals<T>(actual: T, expected: T, msg?: string): void;
