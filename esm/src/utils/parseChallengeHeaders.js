export const GENERIC_CHALLENGE_ID_HEADER = "rblx-challenge-id";
export const GENERIC_CHALLENGE_TYPE_HEADER = "rblx-challenge-type";
export const GENERIC_CHALLENGE_METADATA_HEADER = "rblx-challenge-metadata";
export function parseChallengeHeaders(headers) {
    if (![
        GENERIC_CHALLENGE_TYPE_HEADER,
        GENERIC_CHALLENGE_ID_HEADER,
        GENERIC_CHALLENGE_METADATA_HEADER,
    ].every((item) => headers.has(item))) {
        return null;
    }
    return {
        challengeType: headers.get(GENERIC_CHALLENGE_TYPE_HEADER),
        challengeId: headers.get(GENERIC_CHALLENGE_ID_HEADER),
        challengeBase64Metadata: headers.get(GENERIC_CHALLENGE_METADATA_HEADER),
    };
}
