import { getDict, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { Cta, IndustryGrid, SectionTitle } from "@/components/Sections";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale).industries;
  return pageMeta(locale, "/industries", `${t.title} | Seitara`, t.text);
}

export default async function Industries({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale).industries;
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-20">
        <SectionTitle title={t.title} text={t.text} />
        <IndustryGrid locale={locale} />
      </section>
      <Cta locale={locale} />
    </>
  );
}
