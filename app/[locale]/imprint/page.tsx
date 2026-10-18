import { getDict, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return { title: `${getDict(locale).legal.imprint} | Vexa Studios`, robots: { index: false } };
}

export default async function Imprint({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDict(locale).legal;
  return (
    <section className="mx-auto max-w-2xl px-4 pt-20">
      <h1 className="text-3xl font-bold">{t.imprint}</h1>
      <p className="mt-6 text-muted">{t.placeholder}</p>
      <p className="mt-6 text-muted">Vexa Studios<br />[Name]<br />[Adresse]<br />[E-Mail]</p>
    </section>
  );
}
