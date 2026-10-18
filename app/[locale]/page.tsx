import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { Compare, Cta, Facts, Faq, IndustryGrid, ProjectGrid, SectionTitle, Steps, Tutorial } from "@/components/Sections";
import PreviewBuilder from "@/components/PreviewBuilder";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icons";
import HeroPreview from "@/components/HeroPreview";
import { industries, projects } from "@/lib/content";

const icons = ["tag", "layout", "search"] as const;

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale);

  return (
    <>
      <section className="relative border-b border-line">
        <div className="bg-dots pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-[1.05fr_1fr]">
          <div>
          <p className="eyebrow fade-up">{t.hero.badge}</p>
          <h1 className="fade-up delay-1 mt-5 text-4xl font-semibold leading-[1.08] tracking-tight md:text-[3.5rem]">
            {t.hero.title} <span className="gradient-text">{t.hero.highlight}</span>
          </h1>
          <p className="fade-up delay-2 mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.hero.text}</p>
          <div className="fade-up delay-3 mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={`/${locale}/contact`} className="btn-primary group">{t.hero.primary}<span className="btn-arrow">→</span></Link>
            <Link href="#preview" className="btn-ghost">{t.hero.secondary}</Link>
          </div>
          <ul className="fade-up delay-3 mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {t.hero.trust.map((x) => (
              <li key={x} className="flex items-center gap-2"><span className="text-violet-400"><Icon name="check" className="h-4 w-4" /></span>{x}</li>
            ))}
          </ul>
          </div>
          <div className="fade-up delay-2">
            <HeroPreview badge={t.hero.previewBadge} sites={projects.map((p) => ({ name: p.name, tagline: p.tagline[locale], theme: p.theme }))} />
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

      <Steps locale={locale} />

      <div className="border-y border-line bg-surface/40">
      <section id="preview" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
        <SectionTitle eyebrow={t.builder.eyebrow} title={t.builder.title} text={t.builder.text} />
        <Reveal>
          <PreviewBuilder
            locale={locale}
            t={t.builder}
            industries={industries.map((i) => ({ slug: i.slug, name: i.name[locale], tagline: i.tagline[locale], variant: i.variant }))}
          />
        </Reveal>
      </section>
      </div>

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

      <Compare locale={locale} />
      <Tutorial locale={locale} />
      <Faq locale={locale} />
      <Cta locale={locale} />
    </>
  );
}
