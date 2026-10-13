export type InlineSegment = { text: string } | { text: string; href: string; external: boolean };

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Splits text with "[label](href)" markers into plain and link segments. */
export function parseInlineLinks(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const index = match.index ?? 0;
    if (index > last) segments.push({ text: text.slice(last, index) });
    const href = match[2]!;
    segments.push({ text: match[1]!, href, external: /^https?:\/\//i.test(href) });
    last = index + match[0].length;
  }
  if (last < text.length || segments.length === 0) segments.push({ text: text.slice(last) });
  return segments;
}
