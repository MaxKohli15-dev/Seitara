import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { industries, projects } from "@/lib/content";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import Icon from "./Icons";
import SiteMock from "./SiteMock";

export function SectionTitle({ title, text }: { title: string; text?: string }) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted">{text}</p>}
    </Reveal>
  );
}

export function Faq({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <SectionTitle title={t.pricing.faqTitle} />
      <div className="space-y-3">
        {t.faq.map((f, i) => (
          <Reveal key={f.q} delay={i * 80}>
            <details className="card card-hover group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {f.q}
                <span className="text-xl text-muted transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="faq-answer mt-3 text-muted">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}

export function ProjectGrid({ locale, limit }: { locale: Locale; limit?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {projects.slice(0, limit).map((p, i) => (
        <Reveal key={p.slug} delay={i * 120}>
          <Link href={`/${locale}/portfolio/${p.slug}`} className="card card-hover group block h-full overflow-hidden">
            <div className="p-3 pb-0">
              <SiteMock project={p} locale={locale} />
            </div>
            <div className="p-5">
              <p className="flex items-baseline justify-between gap-3">
                <span className="font-semibold">{p.name}</span>
                <span className="text-xs text-muted">{p.category[locale]}</span>
              </p>
              <p className="mt-2 text-muted">{p.summary[locale]}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function IndustryGrid({ locale }: { locale: Locale }) {
  const t = getDict(locale).industries;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((ind, i) => (
        <Reveal key={ind.slug} delay={(i % 3) * 100}>
          <Link href={`/${locale}/industries/${ind.slug}`} className="card card-hover group flex h-full flex-col p-6">
            <span className="icon-badge flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-bg text-violet-400"><Icon name={ind.icon} className="h-5 w-5" /></span>
            <h3 className="mt-4 text-lg font-semibold">{ind.name[locale]}</h3>
            <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{ind.intro[locale]}</p>
            <span className="mt-4 text-sm font-semibold text-violet-400 transition-transform group-hover:translate-x-1">{t.more} →</span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function Facts({ locale }: { locale: Locale }) {
  const facts = getDict(locale).facts;
  return (
    <section className="mx-auto max-w-6xl px-4">
      <Reveal>
        <dl className="card grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-line">
          {facts.map((f) => (
            <div key={f.label} className="p-6">
              <dt className="sr-only">{f.label}</dt>
              <dd className="text-4xl font-semibold tracking-tight">
                <CountUp value={f.value} prefix={f.prefix} suffix={f.suffix} />
              </dd>
              <p className="mt-2 text-sm text-muted">{f.label}</p>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

export function Tutorial({ locale }: { locale: Locale }) {
  const t = getDict(locale).tutorial;
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <div className="card glow-border grid items-center gap-10 p-8 md:grid-cols-2 md:p-12">
          <div>
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-violet-400" />
              {t.badge}
            </span>
            <h2 className="mt-4 text-2xl font-semibold leading-tight md:text-3xl">{t.title}</h2>
            <p className="mt-4 text-muted">{t.text}</p>
            <ol className="mt-6 space-y-2">
              {t.points.map((pt, i) => (
                <li key={pt} className="flex items-center gap-3">
                  <span className="w-6 font-mono text-sm text-violet-400">0{i + 1}</span>
                  {pt}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <video
              className="aspect-video w-full rounded-lg border border-line bg-bg"
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}/videos/github-pages-tutorial.mp4#t=0.5`}
              controls
              playsInline
              preload="metadata"
              aria-label={t.title}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Cta({ locale }: { locale: Locale }) {
  const t = getDict(locale).cta;
  return (
    <section className="mx-auto max-w-6xl px-4">
      <Reveal>
        <div className="card glow-border flex flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t.title}</h2>
            <p className="mt-2 text-muted">{t.text}</p>
          </div>
          <Link href={`/${locale}/contact`} className="btn-primary shrink-0">{t.button}</Link>
        </div>
      </Reveal>
    </section>
  );
}
