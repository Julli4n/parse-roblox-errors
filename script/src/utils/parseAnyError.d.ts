import { type AnyError } from "../types.js";
export declare function parseAnyError<T>(body: () => string | Promise<string>, handleJSON: (json: T) => AnyError[], headers?: Headers, contentType?: string | null): Promise<AnyError[]>;
