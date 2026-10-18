import type { Metadata } from "next";
import { SITE_URL, locales, type Locale } from "./i18n";

/** Builds title/description plus canonical and hreflang alternates for a path like "/portfolio". */
export function pageMeta(locale: Locale, path: string, title: string, description: string): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`]));
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${locale}${path}`, languages: { ...languages, "x-default": `${SITE_URL}/de${path}` } },
    openGraph: { title, description, url: `${SITE_URL}/${locale}${path}`, siteName: "Seitara", locale, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
