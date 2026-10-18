import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND, getDict, locales, type Locale } from "@/lib/i18n";
import { posts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { Cta } from "@/components/Sections";

type Params = Promise<{ locale: Locale; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta(locale, `/blog/${slug}`, `${p.title[locale]} | Vexa Studios`, p.excerpt[locale]);
}

export default async function PostPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const t = getDict(locale).blog;
  const ld = {
    "@context": "https://schema.org", "@type": "Article", headline: p.title[locale], datePublished: p.date,
    inLanguage: locale, author: { "@type": "Organization", name: BRAND }, publisher: { "@type": "Organization", name: BRAND },
  };

  return (
    <>
      <article className="mx-auto max-w-2xl px-4 pb-20 pt-16">
        <Link href={`/${locale}/blog`} className="text-sm text-muted hover:text-white">← {t.back}</Link>
        <time className="mt-8 block text-sm text-muted" dateTime={p.date}>{new Date(p.date).toLocaleDateString(locale)}</time>
        <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">{p.title[locale]}</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
          {p.body[locale].map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </article>
      <Cta locale={locale} />
    </>
  );
}
