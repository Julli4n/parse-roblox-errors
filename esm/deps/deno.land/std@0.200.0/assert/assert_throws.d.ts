/**
 * Executes a function, expecting it to throw. If it does not, then it
 * throws.
 *
 * @example
 * ```ts
 * import { assertThrows } from "https://deno.land/std@$STD_VERSION/assert/assert_throws.ts";
 *
 * Deno.test("doesThrow", function (): void {
 *   assertThrows((): void => {
 *     throw new TypeError("hello world!");
 *   });
 * });
 *
 * // This test will not pass.
 * Deno.test("fails", function (): void {
 *   assertThrows((): void => {
 *     console.log("Hello world");
 *   });
 * });
 * ```
 */
export declare function assertThrows(fn: () => unknown, msg?: string): unknown;
/**
 * Executes a function, expecting it to throw. If it does not, then it
 * throws. An error class and a string that should be included in the
 * error message can also be asserted.
 *
 * @example
 * ```ts
 * import { assertThrows } from "https://deno.land/std@$STD_VERSION/assert/assert_throws.ts";
 *
 * Deno.test("doesThrow", function (): void {
 *   assertThrows((): void => {
 *     throw new TypeError("hello world!");
 *   }, TypeError);
 *   assertThrows(
 *     (): void => {
 *       throw new TypeError("hello world!");
 *     },
 *     TypeError,
 *     "hello",
 *   );
 * });
 *
 * // This test will not pass.
 * Deno.test("fails", function (): void {
 *   assertThrows((): void => {
 *     console.log("Hello world");
 *   });
 * });
 * ```
 */
export declare function assertThrows<E extends Error = Error>(fn: () => unknown, ErrorClass: new (...args: any[]) => E, msgIncludes?: string, msg?: string): E;
