import { build } from "https://deno.land/x/dnt@0.38.1/mod.ts";
import { copy } from "https://deno.land/std@0.201.0/fs/mod.ts";

await build({
    entryPoints: ["./mod.ts"],
    outDir: "./npm",
    compilerOptions: {
        lib: ["ES2021", "DOM"],
    },
    skipSourceOutput: true,
    shims: {
        deno: true
    },
    package: {
        name: "parse-roblox-errors",
        description: "A Deno/NodeJS module to parse Roblox errors",
        version: "0.1.0",
        homepage: "https://github.com/Julli4n/parse-roblox-errors",
        author: "Julli4n",
        bugs: {
            url: "https://github.com/Julli4n/parse-roblox-errors/issues"
        },
        repository: {
            type: "git",
            url: "git@github.com:Julli4n/parse-roblox-errors.git"
        },
        keywords: [
            "roblox",
            "api"
        ],
        license: "MIT",
    },
    typeCheck: false
});

await copy("./README.md", "./npm/README.md");
await copy("./LICENSE", "./npm/LICENSE");