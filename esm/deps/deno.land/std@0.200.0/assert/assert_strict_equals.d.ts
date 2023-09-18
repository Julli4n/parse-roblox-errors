/**
 * Make an assertion that `actual` and `expected` are strictly equal. If
 * not then throw.
 *
 * @example
 * ```ts
 * import { assertStrictEquals } from "https://deno.land/std@$STD_VERSION/assert/assert_strict_equals.ts";
 *
 * Deno.test("isStrictlyEqual", function (): void {
 *   const a = {};
 *   const b = a;
 *   assertStrictEquals(a, b);
 * });
 *
 * // This test fails
 * Deno.test("isNotStrictlyEqual", function (): void {
 *   const a = {};
 *   const b = {};
 *   assertStrictEquals(a, b);
 * });
 * ```
 */
export declare function assertStrictEquals<T>(actual: unknown, expected: T, msg?: string): asserts actual is T;
