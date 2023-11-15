import { MIMEType } from "../deps.ts";
import { isResponseTypeJson } from "./isResponseTypeJson.ts";
import { type AnyError } from "../types.ts";

export async function parseAnyError<T>(
  body: () => string | Promise<string>,
  handleJSON: (json: T) => AnyError[],
  headers?: Headers,
  contentType?: string | null,
): Promise<AnyError[]> {
  const errors: AnyError[] = [];

  const robloxSystemReason = headers?.get("x-roblox-system-reason");
  if (robloxSystemReason) {
    const reasonParsed = robloxSystemReason.match(/(.+?) \((.+?)\)/);

    errors.push(
      reasonParsed
        ? { code: reasonParsed[2], message: reasonParsed[1] }
        : { message: robloxSystemReason },
    );
  }

  const text = await body();

  const contentLength = headers && headers.has("content-length")
    ? parseInt(headers.get("content-length")!, 10)
    : text.length;
  if (contentLength === 0) return errors;

  contentType = contentType ?? headers?.get("content-type");

  const responseType = MIMEType.parse(contentType ?? "");
  if (!contentType || !responseType) {
    errors.push({ message: text });
    return errors;
  }

  if (isResponseTypeJson(responseType)) {
    // Content type is json, parse.
    errors.push(
      ...handleJSON(
        JSON.parse(text),
      ),
    );
  } else if (responseType.type === "text") {
    errors.push({
      message: text,
    });
  } else {
    errors.push({
      message: `<(${responseType?.type ?? "unknown"}/${
        responseType?.subtype ?? "unknown"
      })-formatted Error>`,
    });
  }

  return errors;
}
