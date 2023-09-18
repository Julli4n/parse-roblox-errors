/**
 * Make an assertion that `actual` object is a subset of `expected` object, deeply.
 * If not, then throw.
 */
export declare function assertObjectMatch(actual: Record<PropertyKey, any>, expected: Record<PropertyKey, unknown>, msg?: string): void;
