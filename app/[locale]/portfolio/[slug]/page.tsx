import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

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
      <div className={`mt-6 flex aspect-[16/9] items-end rounded-2xl bg-gradient-to-br ${p.gradient} p-8`}>
        <h1 className="text-4xl font-bold text-white drop-shadow">{p.name}</h1>
      </div>
      <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-violet-400">{p.category[locale]}</p>
      <p className="mt-3 text-lg leading-relaxed text-muted">{p.details[locale]}</p>
      <Link href={`/${locale}/contact`} className="btn-primary mt-10">{t.visit}</Link>
    </article>
  );
}
