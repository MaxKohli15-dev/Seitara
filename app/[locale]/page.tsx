import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { Cta, Faq, ProjectGrid, SectionTitle, Tutorial } from "@/components/Sections";
import Reveal from "@/components/Reveal";

const icons = ["✦", "◆", "↗"];

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="float pointer-events-none absolute left-[15%] top-10 -z-10 h-[380px] w-[380px] rounded-full bg-violet-600/25 blur-3xl" />
        <div className="float-slow pointer-events-none absolute right-[10%] top-32 -z-10 h-[320px] w-[320px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 pb-20 pt-24 text-center md:pt-32">
          <p className="fade-up inline-block rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-muted">{t.hero.badge}</p>
          <h1 className="fade-up delay-1 mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {t.hero.title} <span className="gradient-text">{t.hero.highlight}</span>
          </h1>
          <p className="fade-up delay-2 mx-auto mt-6 max-w-2xl text-lg text-muted">{t.hero.text}</p>
          <div className="fade-up delay-3 mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={`/${locale}/contact`} className="btn-primary">{t.hero.primary}</Link>
            <Link href={`/${locale}/portfolio`} className="btn-ghost">{t.hero.secondary}</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle title={t.benefits.title} />
        <div className="grid gap-6 md:grid-cols-3">
          {t.benefits.items.map((b, i) => (
            <Reveal key={b.title} delay={i * 120}>
              <div className="card card-hover h-full p-7">
                <span className="icon-badge gradient-text text-2xl">{icons[i]}</span>
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
                <span className="step-num absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-600 font-bold">{i + 1}</span>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-muted">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle title={t.portfolio.title} text={t.portfolio.text} />
        <ProjectGrid locale={locale} limit={3} />
        <div className="mt-10 text-center">
          <Link href={`/${locale}/portfolio`} className="btn-ghost">{t.portfolio.all}</Link>
        </div>
      </section>

      <Tutorial locale={locale} />
      <Faq locale={locale} />
      <Cta locale={locale} />
    </>
  );
}
