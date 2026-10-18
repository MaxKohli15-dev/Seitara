import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import LogoFaq from "./LogoFaq";
import HeaderShell from "./HeaderShell";

export default function Header({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const t = d.nav;
  const other = locale === "de" ? "en" : "de";
  const links = [
    [`/${locale}/portfolio`, t.portfolio],
    [`/${locale}/services`, t.pricing],
    [`/${locale}/industries`, d.industries.nav],
    [`/${locale}/blog`, t.blog],
    [`/${locale}/contact`, t.contact],
  ] as const;

  return (
    <HeaderShell
      logo={<LogoFaq locale={locale} title={d.pricing.faqTitle} homeLabel={d.logoFaq.home} closeLabel={d.logoFaq.close} faq={d.faq} />}
      links={[...links]}
      cta={[`/${locale}/contact`, t.cta]}
      menuLabel={d.menu}
      actions={
        <>
          <Link href={`/${other}`} className="rounded-md border border-line px-2.5 py-1.5 text-xs font-semibold uppercase text-muted transition hover:border-[#3d3d4a] hover:text-white" hrefLang={other}>
            {other}
          </Link>
          <Link href={`/${locale}/contact`} className="btn-primary group !hidden !px-4 !py-2 text-sm md:!inline-flex">
            {t.cta}<span className="btn-arrow">→</span>
          </Link>
        </>
      }
    />
  );
}
