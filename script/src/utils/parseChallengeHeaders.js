"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseChallengeHeaders = exports.GENERIC_CHALLENGE_METADATA_HEADER = exports.GENERIC_CHALLENGE_TYPE_HEADER = exports.GENERIC_CHALLENGE_ID_HEADER = void 0;
exports.GENERIC_CHALLENGE_ID_HEADER = "rblx-challenge-id";
exports.GENERIC_CHALLENGE_TYPE_HEADER = "rblx-challenge-type";
exports.GENERIC_CHALLENGE_METADATA_HEADER = "rblx-challenge-metadata";
function parseChallengeHeaders(headers) {
    if (![
        exports.GENERIC_CHALLENGE_TYPE_HEADER,
        exports.GENERIC_CHALLENGE_ID_HEADER,
        exports.GENERIC_CHALLENGE_METADATA_HEADER,
    ].every((item) => headers.has(item))) {
        return null;
    }
    return {
        challengeType: headers.get(exports.GENERIC_CHALLENGE_TYPE_HEADER),
        challengeId: headers.get(exports.GENERIC_CHALLENGE_ID_HEADER),
        challengeBase64Metadata: headers.get(exports.GENERIC_CHALLENGE_METADATA_HEADER),
    };
}
exports.parseChallengeHeaders = parseChallengeHeaders;
