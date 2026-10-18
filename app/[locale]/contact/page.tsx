import { getDict, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { SectionTitle } from "@/components/Sections";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale).contact;
  return pageMeta(locale, "/contact", `${t.title} | Vexa Studios`, t.text);
}

export default async function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale).contact;
  return (
    <section className="mx-auto max-w-xl px-4 pt-20">
      <SectionTitle title={t.title} text={t.text} />
      <ContactForm t={t} />
    </section>
  );
}
