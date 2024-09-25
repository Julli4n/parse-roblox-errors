export declare const GENERIC_CHALLENGE_ID_HEADER: "rblx-challenge-id";
export declare const GENERIC_CHALLENGE_TYPE_HEADER: "rblx-challenge-type";
export declare const GENERIC_CHALLENGE_METADATA_HEADER: "rblx-challenge-metadata";
type ChallengeType = "captcha" | "forceauthenticator" | "forcetwostepverification" | "securityquestions" | "reauthentication" | "proofofwork" | "rostile" | "privateaccesstoken" | "deviceintegrity" | "emailverification" | "phoneverification";
export type ParsedChallenge = {
    challengeType: ChallengeType;
    challengeId: string;
    challengeBase64Metadata: string;
};
export declare function parseChallengeHeaders(headers: Headers): ParsedChallenge | null;
export {};
