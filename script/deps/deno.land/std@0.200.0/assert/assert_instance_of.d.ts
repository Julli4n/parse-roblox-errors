type AnyConstructor = new (...args: any[]) => any;
type GetConstructorType<T extends AnyConstructor> = T extends new (...args: any) => infer C ? C : never;
/**
 * Make an assertion that `obj` is an instance of `type`.
 * If not then throw.
 */
export declare function assertInstanceOf<T extends AnyConstructor>(actual: unknown, expectedType: T, msg?: string): asserts actual is GetConstructorType<T>;
export {};
