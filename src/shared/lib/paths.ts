/** Normalizes a pathname to the site's trailing-slash convention ("/servicios" -> "/servicios/"). */
export function normalizePath(pathname: string): string {
  const clean = pathname.split(/[?#]/)[0] || "/";
  return clean.endsWith("/") ? clean : `${clean}/`;
}

/** True when `href` points to the page at `pathname` (ignores query, hash and trailing slash). */
export function isCurrentPath(pathname: string, href: string): boolean {
  if (/^[a-z]+:/i.test(href)) return false;
  return normalizePath(pathname) === normalizePath(href);
}
