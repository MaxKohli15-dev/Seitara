import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-white">Vexa<span className="gradient-text">Studios</span></p>
          <p className="mt-1">{t.footer.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link href={`/${locale}/portfolio`} className="hover:text-white">{t.nav.portfolio}</Link>
          <Link href={`/${locale}/blog`} className="hover:text-white">{t.nav.blog}</Link>
          <Link href={`/${locale}/imprint`} className="hover:text-white">{t.footer.imprint}</Link>
          <Link href={`/${locale}/privacy`} className="hover:text-white">{t.footer.privacy}</Link>
        </div>
        <p>© {new Date().getFullYear()} Vexa Studios. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
