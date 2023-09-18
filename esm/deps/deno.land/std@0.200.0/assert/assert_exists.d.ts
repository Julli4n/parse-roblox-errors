/**
 * Make an assertion that actual is not null or undefined.
 * If not then throw.
 */
export declare function assertExists<T>(actual: T, msg?: string): asserts actual is NonNullable<T>;
