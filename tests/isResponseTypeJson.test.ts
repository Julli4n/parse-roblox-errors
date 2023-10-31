import { assertEquals } from "./deps.ts";
import { isResponseTypeJson } from "../src/utils/isResponseTypeJson.ts";
import { MIMEType } from "../src/deps.ts";

Deno.test({
  name: "Check response type is json",
  fn() {
    const textJson = MIMEType.parse("text/json")!;
    const applicationJson = MIMEType.parse("application/json")!;
    const applicationJsonPatch = MIMEType.parse("application/json-patch+json")!;
    const textHtml = MIMEType.parse("text/html")!;
    const applicationHTML = MIMEType.parse("application/html")!;

    assertEquals(
      isResponseTypeJson(textJson),
      true,
      "text/json",
    );
    assertEquals(
      isResponseTypeJson(applicationJson),
      true,
      "application/json",
    );
    assertEquals(
      isResponseTypeJson(applicationJsonPatch),
      true,
      "application/json-patch+json",
    );

    assertEquals(
      isResponseTypeJson(textHtml),
      false,
      "text/html",
    );
    assertEquals(
      isResponseTypeJson(applicationHTML),
      false,
      "application/html",
    );
  },
});
