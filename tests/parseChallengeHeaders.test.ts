import { assertEquals } from "./deps.ts";
import {
    GENERIC_CHALLENGE_ID_HEADER,
    GENERIC_CHALLENGE_METADATA_HEADER,
    GENERIC_CHALLENGE_TYPE_HEADER,
    parseChallengeHeaders,
} from "../mod.ts";

Deno.test({
    name: "Parse challenge headers from response",
    fn() {
        assertEquals(
            parseChallengeHeaders(
                new Headers({
                    [GENERIC_CHALLENGE_TYPE_HEADER]: "captcha",
                    [GENERIC_CHALLENGE_ID_HEADER]: "1",
                    [GENERIC_CHALLENGE_METADATA_HEADER]: "2",
                }),
            ),
            {
                challengeType: "captcha",
                challengeId: "1",
                challengeBase64Metadata: "2",
            },
        );

        assertEquals(
            parseChallengeHeaders(
                new Headers(),
            ),
            null,
        );
    },
});
