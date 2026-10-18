import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/lib/i18n";
import { industries } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { Faq, ProjectGrid } from "@/components/Sections";
import Reveal from "@/components/Reveal";

type Params = Promise<{ locale: Locale; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) => industries.map((i) => ({ locale, slug: i.slug })));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const ind = industries.find((x) => x.slug === slug);
  if (!ind) return {};
  const t = getDict(locale).industries;
  return pageMeta(locale, `/industries/${slug}`, `${t.pageTitle} ${ind.name[locale]} | Vexa Studios`, ind.intro[locale]);
}

export default async function IndustryPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const ind = industries.find((x) => x.slug === slug);
  if (!ind) notFound();
  const t = getDict(locale);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-16 text-center">
          <Link href={`/${locale}/industries`} className="text-sm text-muted hover:text-white">← {t.industries.back}</Link>
          <p className="fade-up mt-8 text-5xl">{ind.icon}</p>
          <h1 className="fade-up delay-1 mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {t.industries.pageTitle} <span className="gradient-text">{ind.name[locale]}</span>
          </h1>
          <p className="fade-up delay-2 mx-auto mt-6 max-w-2xl text-lg text-muted">{ind.intro[locale]}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4">
        <Reveal>
          <div className="card glow-border p-8">
            <h2 className="text-lg font-semibold">{t.industries.included}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[...ind.features[locale], ...t.pricing.free.features.slice(0, 4)].map((f) => (
                <li key={f} className="flex gap-3"><span className="text-violet-400">✓</span>{f}</li>
              ))}
            </ul>
            <Link href={`/${locale}/contact?industry=${ind.slug}`} className="btn-primary mt-8 w-full">{t.industries.request}</Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <ProjectGrid locale={locale} />
      </section>
      <Faq locale={locale} />
    </>
  );
}
