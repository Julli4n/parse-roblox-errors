/**
 * Make an assertion that `error` is an `Error`.
 * If not then an error will be thrown.
 * An error class and a string that should be included in the
 * error message can also be asserted.
 */
export declare function assertIsError<E extends Error = Error>(error: unknown, ErrorClass?: new (...args: any[]) => E, msgIncludes?: string, msg?: string): asserts error is E;
