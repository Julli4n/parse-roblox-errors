## parse-roblox-errors
A random Deno module for parsing BEDEV1/BEDEV2 Roblox errors form the responses, since Roblox is extremely inconsistent. This will also parse `x-roblox-system-reason` on the few endpoints that give it.

### Usage
```typescript
import { parseBEDEV2Error } from "https://deno.land/x/parse_roblox_errors@1.0.1/mod.ts";

console.log(await fetch("https://apis.roblox.com/explore-api/v1/get-sort-content").then(parseBEDEV2Error));
console.log(await fetch("https://apis.roblox.com/toolbox-service/v1/items/details").then(parseBEDEV2Error));
```