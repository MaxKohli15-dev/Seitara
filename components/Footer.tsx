import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { OPERATOR } from "@/lib/legal";
import Logo from "./Logo";
import { asset } from "./SiteMock";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const cols = [
    { title: t.footer.offer, links: [[`/${locale}/services`, t.nav.pricing], [`/${locale}/industries`, t.industries.nav], [`/${locale}/portfolio`, t.nav.portfolio], [`/${locale}#preview`, t.footer.preview]] },
    { title: t.footer.resources, links: [[`/${locale}/blog`, t.nav.blog], [`/${locale}/contact`, t.nav.contact]] },
    { title: t.footer.legal, links: [[`/${locale}/imprint`, t.footer.imprint], [`/${locale}/privacy`, t.footer.privacy]] },
  ];

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">{t.footer.tagline}</p>
          <a href={`mailto:${OPERATOR.email}`} className="mt-4 inline-block text-sm text-muted transition hover:text-white">{OPERATOR.email}</a>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-sm font-medium">{c.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {c.links.map(([href, label]) => (
                <li key={href}><Link href={href} className="transition hover:text-white">{label}</Link></li>
              ))}
              {/* Static tool page outside the Next router, so a plain link with basePath */}
              {c.title === t.footer.resources && (
                <li><a href={asset("/thumbnail/")} className="transition hover:text-white">Roblox Thumbnail Maker</a></li>
              )}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted">© {new Date().getFullYear()} Seitara. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
