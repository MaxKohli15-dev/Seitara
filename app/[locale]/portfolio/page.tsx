import { getDict, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { Cta, ProjectGrid, SectionTitle } from "@/components/Sections";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale).portfolio;
  return pageMeta(locale, "/portfolio", `${t.title} | Vexa Studios`, t.text);
}

export default async function Portfolio({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale).portfolio;
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-20">
        <SectionTitle title={t.title} text={t.text} />
        <ProjectGrid locale={locale} />
      </section>
      <Cta locale={locale} />
    </>
  );
}
