import type { MetadataRoute } from "next";
import { SITE_URL, locales } from "@/lib/i18n";
import { posts, projects } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", "/portfolio", "/services", "/blog", "/contact",
    ...projects.map((p) => `/portfolio/${p.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}${path}`,
      lastModified: new Date(),
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}${path}`])) },
    })),
  );
}
