import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { posts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { SectionTitle } from "@/components/Sections";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale).blog;
  return pageMeta(locale, "/blog", `${t.title} | Vexa Studios`, t.text);
}

export default async function Blog({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale).blog;
  return (
    <section className="mx-auto max-w-4xl px-4 pt-20">
      <SectionTitle title={t.title} text={t.text} />
      <div className="space-y-5">
        {posts.map((p) => (
          <Link key={p.slug} href={`/${locale}/blog/${p.slug}`} className="card card-hover block p-6">
            <time className="text-xs text-muted" dateTime={p.date}>{new Date(p.date).toLocaleDateString(locale)}</time>
            <h2 className="mt-2 text-xl font-semibold">{p.title[locale]}</h2>
            <p className="mt-2 text-muted">{p.excerpt[locale]}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-violet-400">{t.read} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
