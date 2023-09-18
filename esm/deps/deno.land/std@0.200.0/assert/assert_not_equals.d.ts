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
export declare function assertNotEquals<T>(actual: T, expected: T, msg?: string): void;
