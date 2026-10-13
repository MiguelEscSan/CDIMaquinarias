import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { parse } from "@astrojs/compiler-rs";
import { describe, expect, it } from "vitest";

// Guards the i18n rule: user-visible copy lives in src/i18n, never as literals in markup.
// Checks text nodes and human-readable attributes of every .astro file under these folders.

const ROOTS = ["src/components", "src/views", "src/layouts", "src/pages"];
const READABLE_ATTRIBUTES = new Set(["aria-label", "aria-description", "title", "alt", "placeholder", "label"]);
/** Words allowed as literals (brand names, symbols). */
const ALLOWLIST = new Set(["STILL", "CDI"]);
const SKIPPED_ELEMENTS = new Set(["script", "style"]);
const WORD = /\p{L}{3,}/gu;

type AstNode = { type?: string; [key: string]: unknown };

function astroFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return astroFiles(path);
    return entry.name.endsWith(".astro") ? [path] : [];
  });
}

function elementName(node: AstNode): string | undefined {
  const opening = node.openingElement as { name?: { name?: string } } | undefined;
  return opening?.name?.name;
}

function offendingWords(text: string): string[] {
  return (text.match(WORD) ?? []).filter((word) => !ALLOWLIST.has(word));
}

/** Literal copy found in a template: JSX text nodes and quoted readable attributes. */
export function findLiteralCopy(source: string): string[] {
  const { ast } = parse(source);
  const found: string[] = [];

  const walk = (value: unknown): void => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (!value || typeof value !== "object") return;
    const node = value as AstNode;
    if (node.type === "AstroFrontmatter" || node.type === "AstroScript") return;
    if (node.type === "JSXElement" && SKIPPED_ELEMENTS.has(elementName(node) ?? "")) return;
    if (node.type === "JSXText" && offendingWords(String(node.value)).length > 0) {
      found.push(String(node.value).trim());
    }
    if (node.type === "JSXAttribute") {
      const name = (node.name as { name?: string } | undefined)?.name ?? "";
      const literal = node.value as { type?: string; value?: unknown } | null;
      if (READABLE_ATTRIBUTES.has(name) && literal?.type === "Literal") {
        if (offendingWords(String(literal.value)).length > 0) found.push(`${name}="${String(literal.value)}"`);
      }
    }
    for (const [key, child] of Object.entries(node)) if (key !== "type") walk(child);
  };

  walk(ast);
  return found;
}

describe("findLiteralCopy", () => {
  it("reports text nodes and readable attributes, ignoring expressions, scripts and allowlisted words", () => {
    const source = [
      "---",
      'const label = "Hola";',
      "---",
      '<nav aria-label="Principal"><p>Texto fijo</p><p>{label}</p><span>STILL</span></nav>',
      '<p class="text-sm" aria-hidden="true">{label} ©</p>',
      "<script>const x = 'texto';</script>",
      "<style>.a { color: red; }</style>",
    ].join("\n");
    expect(findLiteralCopy(source)).toEqual(['aria-label="Principal"', "Texto fijo"]);
  });
});

describe("templates", () => {
  const files = ROOTS.flatMap(astroFiles);

  it("finds the templates to scan", () => {
    expect(files.length).toBeGreaterThan(20);
  });

  it.each(files.map((file) => [relative(".", file).replaceAll("\\", "/"), file]))(
    "%s has no hardcoded copy",
    (_name, file) => {
      expect(findLiteralCopy(readFileSync(file, "utf8"))).toEqual([]);
    },
  );
});
