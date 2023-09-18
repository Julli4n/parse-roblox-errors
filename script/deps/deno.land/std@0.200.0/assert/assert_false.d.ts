/** Make an assertion, error will be thrown if `expr` have truthy value. */
type Falsy = false | 0 | 0n | "" | null | undefined;
export declare function assertFalse(expr: unknown, msg?: string): asserts expr is Falsy;
export {};
