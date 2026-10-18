import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollUI from "@/components/ScrollUI";
import { BRAND, SITE_URL, getDict, isLocale, locales } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import "../globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale).meta;
  return { metadataBase: new URL(SITE_URL), ...pageMeta(locale, "", t.title, t.description) };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const orgLd = { "@context": "https://schema.org", "@type": "Organization", name: BRAND, url: SITE_URL };

  return (
    <html lang={locale} className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <ScrollUI label={getDict(locale).backToTop} />
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}
