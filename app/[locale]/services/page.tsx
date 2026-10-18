import Link from "next/link";
import Icon from "@/components/Icons";
import { getDict, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { Faq, SectionTitle, Tutorial } from "@/components/Sections";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale).pricing;
  return pageMeta(locale, "/services", `${t.title} | Seitara`, t.text);
}

export default async function Services({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const p = t.pricing;

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-20">
        <SectionTitle title={p.title} text={p.text} />
        <Reveal>
          <div className="card glow-border relative p-8 md:p-10">
            <h2 className="text-lg font-semibold">{p.free.name}</h2>
            <p className="mt-4"><span className="gradient-text text-6xl font-bold">{p.free.price}</span> <span className="text-muted">{p.free.note}</span></p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {p.free.features.map((f) => <li key={f} className="flex gap-3"><span className="mt-0.5 text-violet-400"><Icon name="check" className="h-4 w-4" /></span>{f}</li>)}
            </ul>
            <Link href={`/${locale}/contact`} className="btn-primary mt-10 w-full">{t.nav.cta}</Link>
          </div>
        </Reveal>
      </section>
      <Tutorial locale={locale} />
      <Faq locale={locale} />
    </>
  );
}
