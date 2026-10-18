import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/content";
import Reveal from "./Reveal";

export function SectionTitle({ title, text }: { title: string; text?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
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
            <div className="overflow-hidden">
              <div className={`flex aspect-[16/10] items-end bg-gradient-to-br ${p.gradient} p-5 transition-transform duration-700 ease-out group-hover:scale-105`}>
                <span className="text-2xl font-bold text-white drop-shadow">{p.name}</span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">{p.category[locale]}</p>
              <p className="mt-2 text-muted">{p.summary[locale]}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function Tutorial({ locale }: { locale: Locale }) {
  const t = getDict(locale).tutorial;
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <Reveal>
        <div className="card glow-border grid items-center gap-10 p-8 md:grid-cols-2 md:p-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
              <span className="pulse-dot h-2 w-2 rounded-full bg-violet-400" />
              {t.badge}
            </span>
            <h2 className="mt-5 text-2xl font-bold leading-tight md:text-3xl">{t.title}</h2>
            <p className="mt-4 text-muted">{t.text}</p>
            <ol className="mt-6 space-y-2">
              {t.points.map((pt, i) => (
                <li key={pt} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-600 text-xs font-bold">{i + 1}</span>
                  {pt}
                </li>
              ))}
            </ol>
          </div>
          <div className="relative">
            <div className="float absolute -left-10 -top-10 -z-10 h-40 w-40 rounded-full bg-violet-600/30 blur-2xl" />
            <div className="float-slow absolute -bottom-10 -right-10 -z-10 h-40 w-40 rounded-full bg-blue-600/30 blur-2xl" />
            <video
              className="aspect-video w-full rounded-2xl border border-line bg-bg shadow-2xl shadow-violet-900/30"
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
        <div className="animated-gradient relative overflow-hidden rounded-3xl border border-line px-6 py-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{t.title}</h2>
          <p className="mt-3 text-muted">{t.text}</p>
          <Link href={`/${locale}/contact`} className="btn-primary mt-8">{t.button}</Link>
        </div>
      </Reveal>
    </section>
  );
}
