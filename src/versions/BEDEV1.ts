import { parseBEDEV2ErrorFromJSON } from "../../mod.ts";
import type { AnyError } from "../types.ts";
import { parseAnyError } from "../utils/parseAnyError.ts";

type BEDEV1ErrorResponse = string | {
  errors: {
    code: number;
    message: string;
    userFacingMessage?: string;
    field?: string;
    fieldData?: string;
    retryable?: boolean;
    hint?: string | null;
  }[];
} | {
  code: string | number;
  message: string;
};

export function parseBEDEV1ErrorFromJSON(
  json: BEDEV1ErrorResponse,
): AnyError[] {
  if (typeof json === "string") {
    // in some context, it can be a string
    return [{
      message: json,
    }];
  } else if ("code" in json) {
    return [{
      code: json?.code ?? undefined,
      message: json?.message,
    }];
  } else {
    return json?.errors?.flatMap((error) => {
      const message = error.message;

      // Parse the fucking stupid json errors in error.message shit
      if (message?.startsWith("{")) {
          try {
            const data = JSON.parse(message.trim());

            return parseBEDEV2ErrorFromJSON(data);
          } catch {
            return [];
          }
      }

      return error;
    }) ?? [];
  }
}

export function parseBEDEV1ErrorFromString(
  text: string,
  contentType: string,
): ReturnType<typeof parseAnyError> {
  return parseAnyError(
    () => text.trim(),
    parseBEDEV1ErrorFromJSON,
    undefined,
    contentType,
  );
}

export function parseBEDEV1Error(
  response: Response,
): ReturnType<typeof parseAnyError> {
  return parseAnyError(
    () => response.text().then((text) => text.trim()),
    parseBEDEV1ErrorFromJSON,
    response.headers,
  );
}

export function parseBEDEV1ErrorFromStringAndHeaders(
  text: string,
  headers: Headers,
): ReturnType<typeof parseAnyError> {
  return parseAnyError(
    () => text.trim(),
    parseBEDEV1ErrorFromJSON,
    headers,
  );
}