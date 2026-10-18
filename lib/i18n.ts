export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const SITE_URL = "https://vexastudios.example";
export const BRAND = "Vexa Studios";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const de = {
  nav: { home: "Start", portfolio: "Portfolio", pricing: "Leistungen", blog: "Ratgeber", contact: "Kontakt", cta: "Gratis-Website anfragen" },
  meta: {
    title: "Kostenlose Website erstellen lassen | Vexa Studios",
    description: "Wir erstellen deine professionelle Website kostenlos – modern, schnell und mobiloptimiert. Komplett gratis – auch das Hosting über GitHub Pages.",
  },
  hero: {
    badge: "100 % kostenlos · keine versteckten Kosten",
    title: "Deine professionelle Website –",
    highlight: "kostenlos.",
    text: "Wir designen und bauen deine Website gratis. Modern, schnell und bereit für Google. Online stellst du sie kostenlos mit GitHub Pages.",
    primary: "Jetzt Website anfragen",
    secondary: "Beispiele ansehen",
  },
  benefits: {
    title: "Warum Vexa Studios?",
    items: [
      { title: "Wirklich gratis", text: "Design und Umsetzung kosten dich nichts. Kein Abo, keine Falle." },
      { title: "Profi-Qualität", text: "Modernes Design, blitzschnelle Ladezeiten und perfekt auf dem Handy." },
      { title: "SEO inklusive", text: "Saubere Technik, damit deine Kunden dich bei Google finden." },
    ],
  },
  steps: {
    title: "In 3 Schritten online",
    items: [
      { title: "Anfrage senden", text: "Erzähl uns kurz, was du brauchst – dauert 2 Minuten." },
      { title: "Entwurf erhalten", text: "Wir gestalten deinen Entwurf und stimmen ihn mit dir ab." },
      { title: "Live gehen", text: "Deine Website geht online. Fertig." },
    ],
  },
  portfolio: { title: "Beispiel-Designs", text: "So könnte deine Website aussehen – drei Design-Konzepte für unterschiedliche Branchen.", concept: "Design-Konzept", all: "Alle Beispiele", back: "Zurück zum Portfolio", visit: "Ähnliche Website anfragen" },
  pricing: {
    title: "Unsere Leistungen",
    text: "Alles, was du für einen professionellen Auftritt brauchst – komplett kostenlos.",
    free: { name: "Deine Website", price: "0 €", note: "für immer", features: ["Individuelles Design", "Mobiloptimiert", "SEO-Grundlagen", "Kontaktformular", "Alle Dateien gehören dir", "Kostenloses Hosting via GitHub Pages"] },
    faqTitle: "Häufige Fragen",
  },
  tutorial: {
    badge: "Jetzt ansehen",
    title: "Video-Tutorial: Deine Website mit GitHub Pages online stellen",
    text: "In diesem Schritt-für-Schritt-Video zeigen wir, wie du die Website, die wir für dich bauen, kostenlos mit GitHub Pages veröffentlichst – ganz ohne Vorkenntnisse.",
    points: ["GitHub-Konto anlegen", "Website-Dateien hochladen", "GitHub Pages aktivieren", "Live gehen – gratis"],
  },
  faq: [
    { q: "Ist die Website wirklich kostenlos?", a: "Ja, zu 100 %. Design, Umsetzung und Hosting über GitHub Pages kosten dich nichts." },
    { q: "Wo wird meine Website gehostet?", a: "Kostenlos bei GitHub Pages. In unserem Video-Tutorial zeigen wir dir Schritt für Schritt, wie das geht." },
    { q: "Wie lange dauert es?", a: "In der Regel ist deine Website innerhalb von 1–2 Wochen fertig." },
    { q: "Gehört mir die Website?", a: "Ja. Du bekommst alle Dateien und bist an nichts gebunden." },
  ],
  blog: { title: "Ratgeber", text: "Tipps rund um Websites, SEO und Online-Marketing.", read: "Weiterlesen", back: "Zurück zum Ratgeber" },
  contact: {
    title: "Gratis-Website anfragen",
    text: "Erzähl uns von deinem Projekt. Wir melden uns innerhalb von 24 Stunden.",
    name: "Name", email: "E-Mail", project: "Was für eine Website brauchst du?",
    submit: "Anfrage senden", sending: "Wird gesendet …",
    success: "Danke! Wir melden uns in Kürze bei dir.", error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
  },
  industries: {
    nav: "Branchen",
    title: "Websites für jede Branche",
    text: "Wir kennen die Anforderungen deiner Branche – und bauen dir genau die Website, die du brauchst.",
    more: "Mehr erfahren",
    pageTitle: "Kostenlose Website für",
    included: "Das ist drin",
    request: "Website für meine Branche anfragen",
    back: "Alle Branchen",
  },
  facts: [
    { value: 0, prefix: "", suffix: " €", label: "Kosten für dich" },
    { value: 2, prefix: "1–", suffix: "", label: "Wochen bis zur fertigen Seite" },
    { value: 100, prefix: "", suffix: " %", label: "mobiloptimiert" },
    { value: 2, prefix: "", suffix: "", label: "Sprachen: Deutsch & Englisch" },
  ],
  configurator: {
    industry: "Branche",
    choose: "Bitte wählen",
    other: "Sonstiges",
    needs: "Was soll deine Website können?",
    options: ["Onepager", "Mehrere Seiten", "Bildergalerie", "Blog / News", "Termin- oder Reservierungsanfrage", "Mehrsprachig"],
    hasSite: "Ich habe schon eine Website (Neugestaltung)",
  },
  backToTop: "Nach oben",
  logoFaq: { home: "Zur Startseite", close: "Schließen" },
  cta: { title: "Bereit für deine neue Website?", text: "Kostenlos, unverbindlich und in wenigen Tagen online.", button: "Jetzt starten" },
  footer: { tagline: "Professionelle Websites – kostenlos.", imprint: "Impressum", privacy: "Datenschutz", rights: "Alle Rechte vorbehalten." },
  legal: { imprint: "Impressum", privacy: "Datenschutzerklärung", placeholder: "Platzhalter – bitte vor dem Livegang durch die rechtlich korrekten Angaben ersetzen." },
};

const en: typeof de = {
  nav: { home: "Home", portfolio: "Portfolio", pricing: "Services", blog: "Guides", contact: "Contact", cta: "Get a free website" },
  meta: {
    title: "Get a Free Professional Website | Vexa Studios",
    description: "We build your professional website for free – modern, fast and mobile-ready. Completely free – including hosting via GitHub Pages.",
  },
  hero: {
    badge: "100% free · no hidden costs",
    title: "Your professional website –",
    highlight: "for free.",
    text: "We design and build your website at no cost. Modern, fast and ready for Google. Publish it for free with GitHub Pages.",
    primary: "Request your website",
    secondary: "See examples",
  },
  benefits: {
    title: "Why Vexa Studios?",
    items: [
      { title: "Truly free", text: "Design and development cost you nothing. No subscription, no catch." },
      { title: "Pro quality", text: "Modern design, lightning-fast load times and perfect on mobile." },
      { title: "SEO included", text: "Clean code so your customers can find you on Google." },
    ],
  },
  steps: {
    title: "Online in 3 steps",
    items: [
      { title: "Send a request", text: "Tell us briefly what you need – takes 2 minutes." },
      { title: "Get your draft", text: "We design your draft and refine it with you." },
      { title: "Go live", text: "Your website goes online. Done." },
    ],
  },
  portfolio: { title: "Example designs", text: "This is what your website could look like – three design concepts for different industries.", concept: "Design concept", all: "All examples", back: "Back to portfolio", visit: "Request a similar website" },
  pricing: {
    title: "Our services",
    text: "Everything you need for a professional presence – completely free.",
    free: { name: "Your website", price: "€0", note: "forever", features: ["Custom design", "Mobile-optimized", "SEO basics", "Contact form", "You own all files", "Free hosting via GitHub Pages"] },
    faqTitle: "Frequently asked questions",
  },
  tutorial: {
    badge: "Watch now",
    title: "Video tutorial: Publish your website with GitHub Pages",
    text: "This step-by-step video shows how to publish the website we build for you on GitHub Pages for free – no prior knowledge needed.",
    points: ["Create a GitHub account", "Upload your website files", "Enable GitHub Pages", "Go live – for free"],
  },
  faq: [
    { q: "Is the website really free?", a: "Yes, 100%. Design, development and hosting via GitHub Pages cost you nothing." },
    { q: "Where is my website hosted?", a: "For free on GitHub Pages. Our video tutorial shows you step by step how it works." },
    { q: "How long does it take?", a: "Your website is usually ready within 1–2 weeks." },
    { q: "Do I own the website?", a: "Yes. You get all files and you're not locked in." },
  ],
  blog: { title: "Guides", text: "Tips on websites, SEO and online marketing.", read: "Read more", back: "Back to guides" },
  contact: {
    title: "Request your free website",
    text: "Tell us about your project. We'll get back to you within 24 hours.",
    name: "Name", email: "Email", project: "What kind of website do you need?",
    submit: "Send request", sending: "Sending …",
    success: "Thanks! We'll be in touch shortly.", error: "Something went wrong. Please try again.",
  },
  industries: {
    nav: "Industries",
    title: "Websites for every industry",
    text: "We know what your industry needs – and build exactly the website you need.",
    more: "Learn more",
    pageTitle: "Free website for",
    included: "What's included",
    request: "Request a website for my industry",
    back: "All industries",
  },
  facts: [
    { value: 0, prefix: "€", suffix: "", label: "cost to you" },
    { value: 2, prefix: "1–", suffix: "", label: "weeks until your site is ready" },
    { value: 100, prefix: "", suffix: "%", label: "mobile-optimized" },
    { value: 2, prefix: "", suffix: "", label: "languages: German & English" },
  ],
  configurator: {
    industry: "Industry",
    choose: "Please choose",
    other: "Other",
    needs: "What should your website do?",
    options: ["One-pager", "Multiple pages", "Photo gallery", "Blog / news", "Booking or appointment requests", "Multilingual"],
    hasSite: "I already have a website (redesign)",
  },
  backToTop: "Back to top",
  logoFaq: { home: "Go to homepage", close: "Close" },
  cta: { title: "Ready for your new website?", text: "Free, no obligation and online in days.", button: "Get started" },
  footer: { tagline: "Professional websites – for free.", imprint: "Imprint", privacy: "Privacy", rights: "All rights reserved." },
  legal: { imprint: "Imprint", privacy: "Privacy policy", placeholder: "Placeholder – replace with legally correct information before going live." },
};

export const dictionaries = { de, en };
export type Dictionary = typeof de;

export function getDict(locale: Locale): Dictionary {
  return dictionaries[locale];
}
