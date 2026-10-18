import { getDict, type Locale } from "@/lib/i18n";
import { imprint } from "@/lib/legal";
import LegalPage from "@/components/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return { title: `${getDict(locale).legal.imprint} | Seitara`, robots: { index: false } };
}

export default async function Imprint({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <LegalPage title={getDict(locale).legal.imprint} sections={imprint(locale)} />;
}
