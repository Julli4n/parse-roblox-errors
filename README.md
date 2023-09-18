## parse-roblox-errors

A random Deno module for parsing BEDEV1/BEDEV2 Roblox errors form the responses,
since Roblox is extremely inconsistent. This will also parse
`x-roblox-system-reason` on the few endpoints that give it.

### Usage

#### BEDEV1 (anything except apis.roblox.com)

```typescript
import { parseBEDEV1Error } from "https://deno.land/x/parse_roblox_errors@1.1.3/mod.ts";

console.log(
    await fetch("http://auth.roblox.com/v2/signup").then(parseBEDEV1Error),
);
console.log(
    await fetch("https://develop.roblox.com/v1/assets?assetIds=1818").then(
        parseBEDEV1Error,
    ),
);
```

#### BEDEV2 (apis.roblox.com)

What the module was made for.

```typescript
import { parseBEDEV2Error } from "https://deno.land/x/parse_roblox_errors@1.1.3/mod.ts";

console.log(
    await fetch("https://apis.roblox.com/explore-api/v1/get-sort-content").then(
        parseBEDEV2Error,
    ),
);
console.log(
    await fetch("https://apis.roblox.com/toolbox-service/v1/items/details")
        .then(
            parseBEDEV2Error,
        ),
);
```
