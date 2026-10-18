import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import SiteMock from "@/components/SiteMock";

type Params = Promise<{ locale: Locale; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta(locale, `/portfolio/${slug}`, `${p.name} – ${p.category[locale]} | Vexa Studios`, p.summary[locale]);
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const t = getDict(locale).portfolio;

  return (
    <article className="mx-auto max-w-3xl px-4 pt-16">
      <Link href={`/${locale}/portfolio`} className="text-sm text-muted hover:text-white">← {t.back}</Link>
      <p className="eyebrow mt-8">{p.category[locale]} · {t.concept}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{p.name}</h1>
      <div className="mt-8"><SiteMock site={{ name: p.name, tagline: p.tagline[locale], theme: p.theme }} large /></div>
      <p className="mt-8 text-lg leading-relaxed text-muted">{p.details[locale]}</p>
      <Link href={`/${locale}/contact`} className="btn-primary mt-10">{t.visit}</Link>
    </article>
  );
}
