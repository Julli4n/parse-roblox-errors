import { Deno } from "@deno/shim-deno";
export { Deno } from "@deno/shim-deno";
export {} from "whatwg-mimetype";
export declare const dntGlobalThis: Omit<typeof globalThis, "Deno"> & {
    Deno: typeof Deno;
};
