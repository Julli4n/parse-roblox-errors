/**
 * Executes a function which returns a promise, expecting it to reject.
 *
 * @example
 * ```ts
 * import { assertRejects } from "https://deno.land/std@$STD_VERSION/assert/assert_rejects.ts";
 *
 * Deno.test("doesThrow", async function () {
 *   await assertRejects(
 *     async () => {
 *       throw new TypeError("hello world!");
 *     },
 *   );
 *   await assertRejects(
 *     async () => {
 *       return Promise.reject(new Error());
 *     },
 *   );
 * });
 *
 * // This test will not pass.
 * Deno.test("fails", async function () {
 *   await assertRejects(
 *     async () => {
 *       console.log("Hello world");
 *     },
 *   );
 * });
 * ```
 */
export declare function assertRejects(fn: () => PromiseLike<unknown>, msg?: string): Promise<unknown>;
/**
 * Executes a function which returns a promise, expecting it to reject.
 * If it does not, then it throws. An error class and a string that should be
 * included in the error message can also be asserted.
 *
 * @example
 * ```ts
 * import { assertRejects } from "https://deno.land/std@$STD_VERSION/assert/assert_rejects.ts";
 *
 * Deno.test("doesThrow", async function () {
 *   await assertRejects(async () => {
 *     throw new TypeError("hello world!");
 *   }, TypeError);
 *   await assertRejects(
 *     async () => {
 *       throw new TypeError("hello world!");
 *     },
 *     TypeError,
 *     "hello",
 *   );
 * });
 *
 * // This test will not pass.
 * Deno.test("fails", async function () {
 *   await assertRejects(
 *     async () => {
 *       console.log("Hello world");
 *     },
 *   );
 * });
 * ```
 */
export declare function assertRejects<E extends Error = Error>(fn: () => PromiseLike<unknown>, ErrorClass: new (...args: any[]) => E, msgIncludes?: string, msg?: string): Promise<E>;
