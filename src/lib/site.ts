export const siteBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export function withBasePath(path: string) {
  if (!path.startsWith("/") || !siteBasePath || path === siteBasePath || path.startsWith(`${siteBasePath}/`)) {
    return path;
  }

  return `${siteBasePath}${path}`;
}

export function absoluteSiteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pathWithoutBase = siteBasePath && normalizedPath.startsWith(`${siteBasePath}/`)
    ? normalizedPath.slice(siteBasePath.length)
    : normalizedPath;
  return `${siteUrl}${pathWithoutBase}`;
}
