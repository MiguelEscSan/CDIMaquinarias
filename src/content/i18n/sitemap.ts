import { hreflangAlternates, pageIdFromPath } from "./";

/** hreflang alternates of a sitemap URL (absolute), for `@astrojs/sitemap` `links`. */
export function sitemapLinks(url: string, site: string): { lang: string; url: string }[] {
  const pageId = pageIdFromPath(new URL(url).pathname);
  if (!pageId) return [];
  return hreflangAlternates(pageId).map(({ hreflang, path }) => ({
    lang: hreflang,
    url: new URL(path, site).toString(),
  }));
}
