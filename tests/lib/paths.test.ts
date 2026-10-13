import { describe, expect, it } from "vitest";
import { isCurrentPath, normalizePath } from "../../src/lib/paths";

describe("normalizePath", () => {
  it("adds a trailing slash and drops query and hash", () => {
    expect(normalizePath("/servicios")).toBe("/servicios/");
    expect(normalizePath("/contacto/?equipo=x#form")).toBe("/contacto/");
    expect(normalizePath("")).toBe("/");
  });
});

describe("isCurrentPath", () => {
  it("matches the same page regardless of trailing slash", () => {
    expect(isCurrentPath("/servicios", "/servicios/")).toBe(true);
    expect(isCurrentPath("/", "/")).toBe(true);
    expect(isCurrentPath("/servicios/", "/")).toBe(false);
  });

  it("never matches protocol links", () => {
    expect(isCurrentPath("/", "tel:+34928133851")).toBe(false);
  });
});
