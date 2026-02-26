import type { AppLanguage } from './translations';

export type LocaleSegment = 'en' | 'mkd';

const SUPPORTED = new Set<LocaleSegment>(['en', 'mkd']);

export function languageToSegment(language: AppLanguage): LocaleSegment {
  return language === 'mk' ? 'mkd' : 'en';
}

export function segmentToLanguage(segment: string | null | undefined): AppLanguage | null {
  if (!segment) return null;
  if (segment === 'en') return 'en';
  if (segment === 'mkd') return 'mk';
  return null;
}

export function getLocaleSegmentFromPathname(pathname: string): LocaleSegment | null {
  const first = pathname.split('/').filter(Boolean)[0] ?? null;
  if (!first) return null;
  return SUPPORTED.has(first as LocaleSegment) ? (first as LocaleSegment) : null;
}

export function stripLocaleFromPathname(pathname: string): string {
  const segment = getLocaleSegmentFromPathname(pathname);
  if (!segment) return pathname || '/';
  const stripped = pathname.replace(new RegExp(`^/${segment}(?=/|$)`), '') || '/';
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

export function withLocalePath(pathname: string, language: AppLanguage): string {
  const base = stripLocaleFromPathname(pathname || '/');
  const clean = base.startsWith('/') ? base : `/${base}`;
  const prefix = `/${languageToSegment(language)}`;
  return clean === '/' ? prefix : `${prefix}${clean}`;
}

export function isLocalePrefixedPath(pathname: string): boolean {
  return getLocaleSegmentFromPathname(pathname) !== null;
}
