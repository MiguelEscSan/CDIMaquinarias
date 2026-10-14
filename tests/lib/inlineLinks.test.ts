import { describe, expect, it } from "vitest";
import { parseInlineLinks } from "../../src/shared/lib/inlineLinks";

describe("parseInlineLinks", () => {
  it("returns plain text as a single segment", () => {
    expect(parseInlineLinks("Texto sin enlaces.")).toEqual([{ text: "Texto sin enlaces." }]);
  });

  it("splits markdown-style links into link segments", () => {
    expect(parseInlineLinks("Lea la [política](/politica-de-datos/) y [escriba](mailto:a@b.es).")).toEqual([
      { text: "Lea la " },
      { text: "política", href: "/politica-de-datos/", external: false },
      { text: " y " },
      { text: "escriba", href: "mailto:a@b.es", external: false },
      { text: "." },
    ]);
  });

  it("flags http(s) links as external", () => {
    expect(parseInlineLinks("[Google](https://policies.google.com/privacy)")).toEqual([
      { text: "Google", href: "https://policies.google.com/privacy", external: true },
    ]);
  });
});
