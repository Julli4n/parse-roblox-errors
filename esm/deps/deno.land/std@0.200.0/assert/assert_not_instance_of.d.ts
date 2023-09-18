/**
 * Make an assertion that `obj` is not an instance of `type`.
 * If so, then throw.
 */
export declare function assertNotInstanceOf<A, T>(actual: A, unexpectedType: new (...args: any[]) => T, msg?: string): asserts actual is Exclude<A, T>;
