import { getDict, type Locale } from "@/lib/i18n";
import { privacy } from "@/lib/legal";
import LegalPage from "@/components/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return { title: `${getDict(locale).legal.privacy} | Vexa Studios`, robots: { index: false } };
}

export default async function Privacy({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <LegalPage title={getDict(locale).legal.privacy} sections={privacy(locale)} />;
}
