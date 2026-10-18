import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { Cta, Facts, Faq, IndustryGrid, ProjectGrid, SectionTitle, Tutorial } from "@/components/Sections";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icons";

const icons = ["tag", "layout", "search"] as const;

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-20 md:pb-28 md:pt-28">
          <p className="eyebrow fade-up">{t.hero.badge}</p>
          <h1 className="fade-up delay-1 mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
            {t.hero.title} <span className="gradient-text">{t.hero.highlight}</span>
          </h1>
          <p className="fade-up delay-2 mt-6 max-w-xl text-lg text-muted">{t.hero.text}</p>
          <div className="fade-up delay-3 mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={`/${locale}/contact`} className="btn-primary">{t.hero.primary}</Link>
            <Link href={`/${locale}/portfolio`} className="btn-ghost">{t.hero.secondary}</Link>
          </div>
        </div>
      </section>

      <div className="pt-16"><Facts locale={locale} /></div>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle title={t.benefits.title} />
        <div className="grid gap-6 md:grid-cols-3">
          {t.benefits.items.map((b, i) => (
            <Reveal key={b.title} delay={i * 120}>
              <div className="card card-hover h-full p-7">
                <span className="icon-badge flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-bg text-violet-400"><Icon name={icons[i]} /></span>
                <h3 className="mt-4 text-xl font-semibold">{b.title}</h3>
                <p className="mt-2 text-muted">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle title={t.steps.title} />
        <ol className="grid gap-6 md:grid-cols-3">
          {t.steps.items.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 150} className="relative pl-14">
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface font-mono text-sm text-violet-400">0{i + 1}</span>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-muted">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle title={t.industries.title} text={t.industries.text} />
        <IndustryGrid locale={locale} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle title={t.portfolio.title} text={t.portfolio.text} />
        <ProjectGrid locale={locale} limit={3} />
        <div className="mt-10">
          <Link href={`/${locale}/portfolio`} className="btn-ghost">{t.portfolio.all}</Link>
        </div>
      </section>

      <Tutorial locale={locale} />
      <Faq locale={locale} />
      <Cta locale={locale} />
    </>
  );
}
