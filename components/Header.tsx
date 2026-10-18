import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import Logo from "./Logo";

export default function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale).nav;
  const other = locale === "de" ? "en" : "de";
  const links = [
    ["/portfolio", t.portfolio],
    ["/services", t.pricing],
    ["/blog", t.blog],
    ["/contact", t.contact],
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href={`/${locale}`} aria-label="Vexa Studios Sites" className="transition-opacity hover:opacity-90">
          <Logo />
        </Link>
        <ul className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <Link href={`/${locale}${href}`} className="transition hover:text-white">{label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Link href={`/${other}`} className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold uppercase text-muted hover:text-white" hrefLang={other}>
            {other}
          </Link>
          <Link href={`/${locale}/contact`} className="btn-primary !hidden !px-4 !py-2 text-sm sm:!inline-flex">{t.cta}</Link>
        </div>
      </nav>
      <ul className="flex justify-center gap-5 border-t border-line/60 px-4 py-2 text-sm text-muted md:hidden">
        {links.map(([href, label]) => (
          <li key={href}><Link href={`/${locale}${href}`}>{label}</Link></li>
        ))}
      </ul>
    </header>
  );
}
