import * as dntShim from "../_dnt.test_shims.js";
import { assertEquals } from "./deps.js";
import { parseBEDEV1Error } from "../mod.js";
import { responseFromJSON } from "./utils/responseFromJson.js";
dntShim.Deno.test({
    name: "Parse errors from response",
    async fn() {
        assertEquals(await parseBEDEV1Error(responseFromJSON("Error")), [
            {
                message: "Error",
            },
        ], "Error as string returned");
        assertEquals(await parseBEDEV1Error(responseFromJSON({
            code: 0,
            message: "Error",
        })), [
            {
                code: 0,
                message: "Error",
            },
        ], "1 error object returned");
        assertEquals(await parseBEDEV1Error(responseFromJSON({
            errors: [{
                    code: 0,
                    message: "Error",
                    userFacingMessage: "User Facing",
                }],
        })), [
            {
                code: 0,
                message: "Error",
                userFacingMessage: "User Facing",
            },
        ], "Regular error arrays with userFacingMessage returned");
    },
});
