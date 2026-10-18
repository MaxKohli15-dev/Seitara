import type { Locale } from "./i18n";

type Localized = Record<Locale, string>;

export type Project = {
  slug: string;
  name: string;
  category: Localized;
  summary: Localized;
  details: Localized;
  gradient: string;
};

export const projects: Project[] = [
  {
    slug: "cafe-lumen",
    name: "Café Lumen",
    category: { de: "Gastronomie", en: "Hospitality" },
    summary: { de: "Einladende Website mit Speisekarte und Tischreservierung.", en: "Inviting website with menu and table booking." },
    details: {
      de: "Für Café Lumen haben wir eine warme, bildstarke Website mit digitaler Speisekarte, Öffnungszeiten und Reservierungsformular gebaut. Lokale Suchanfragen wie „Café in der Nähe“ bringen seitdem deutlich mehr Besucher.",
      en: "For Café Lumen we built a warm, image-rich website with a digital menu, opening hours and a booking form. Local searches like “café near me” now bring in noticeably more visitors.",
    },
    gradient: "from-amber-500 to-rose-500",
  },
  {
    slug: "fitlab-studio",
    name: "FitLab Studio",
    category: { de: "Fitness", en: "Fitness" },
    summary: { de: "Dynamischer Auftritt mit Kursplan und Probetraining.", en: "Dynamic site with class schedule and free trial." },
    details: {
      de: "FitLab wollte mehr Probetrainings. Wir haben eine energiegeladene Seite mit Kursplan, Trainerprofilen und einem klaren Call-to-Action gebaut.",
      en: "FitLab wanted more trial sign-ups. We built an energetic site with class schedule, trainer profiles and a clear call to action.",
    },
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    slug: "nordwerk-handwerk",
    name: "Nordwerk",
    category: { de: "Handwerk", en: "Trades" },
    summary: { de: "Seriöse Handwerker-Website mit Referenzen und Anfrageformular.", en: "Trustworthy trades website with references and quote form." },
    details: {
      de: "Nordwerk ist ein Schreinerbetrieb. Die neue Website zeigt Referenzprojekte in einer Galerie und sammelt Angebotsanfragen direkt online.",
      en: "Nordwerk is a carpentry business. The new website shows reference projects in a gallery and collects quote requests online.",
    },
    gradient: "from-sky-500 to-indigo-500",
  },
];

export type Post = {
  slug: string;
  date: string;
  title: Localized;
  excerpt: Localized;
  body: Record<Locale, string[]>;
};

export const posts: Post[] = [
  {
    slug: "kostenlose-website-erstellen",
    date: "2026-10-01",
    title: { de: "Kostenlose Website erstellen: Der komplette Leitfaden", en: "How to Get a Free Website: The Complete Guide" },
    excerpt: { de: "Welche Möglichkeiten gibt es, eine Website gratis zu bekommen – und worauf solltest du achten?", en: "What options are there to get a website for free – and what should you watch out for?" },
    body: {
      de: [
        "Eine eigene Website ist heute für fast jedes Unternehmen Pflicht. Doch gerade kleine Betriebe scheuen die Kosten. Die gute Nachricht: Es geht auch kostenlos.",
        "Baukästen wie Wix oder Jimdo sind gratis, zeigen aber Werbung und eine fremde Domain. Eine professionelle Alternative ist ein Dienstleister wie Vexa Studios, der Design und Umsetzung kostenlos übernimmt.",
        "Achte auf drei Dinge: Gehören dir die Inhalte? Ist die Seite mobiloptimiert? Und kannst du später problemlos wechseln? Wenn ja – los geht's.",
      ],
      en: [
        "A website is a must for almost every business today. Yet small businesses often shy away from the cost. The good news: it can be free.",
        "Builders like Wix or Jimdo are free but show ads and a third-party domain. A professional alternative is a service like Vexa Studios that handles design and development for free.",
        "Check three things: Do you own your content? Is the site mobile-friendly? Can you switch later without hassle? If yes – go for it.",
      ],
    },
  },
  {
    slug: "seo-grundlagen-kleine-unternehmen",
    date: "2026-10-08",
    title: { de: "SEO-Grundlagen für kleine Unternehmen", en: "SEO Basics for Small Businesses" },
    excerpt: { de: "So wirst du bei Google gefunden – ohne Agentur-Budget.", en: "How to get found on Google – without an agency budget." },
    body: {
      de: [
        "Suchmaschinenoptimierung klingt kompliziert, beginnt aber mit einfachen Schritten.",
        "Lege ein kostenloses Google-Unternehmensprofil an, nutze klare Seitentitel mit deinem Ort und sorge für schnelle Ladezeiten.",
        "Regelmäßige Inhalte – etwa ein kleiner Ratgeber – zeigen Google, dass deine Seite lebt.",
      ],
      en: [
        "Search engine optimization sounds complicated but starts with simple steps.",
        "Create a free Google Business Profile, use clear page titles that include your city and make sure your site loads fast.",
        "Regular content – like a small guide section – shows Google your site is alive.",
      ],
    },
  },
  {
    slug: "website-checkliste",
    date: "2026-10-15",
    title: { de: "Checkliste: Das gehört auf jede Firmenwebsite", en: "Checklist: What Every Business Website Needs" },
    excerpt: { de: "Von Kontaktdaten bis Impressum – die wichtigsten Elemente im Überblick.", en: "From contact details to legal pages – the essentials at a glance." },
    body: {
      de: [
        "Besucher entscheiden in Sekunden, ob sie bleiben. Diese Elemente sollten nie fehlen:",
        "Ein klares Angebot auf der Startseite, gut sichtbare Kontaktdaten, echte Fotos, Kundenstimmen sowie Impressum und Datenschutzerklärung.",
        "Bonus: ein deutlicher Call-to-Action wie „Jetzt anfragen“ auf jeder Seite.",
      ],
      en: [
        "Visitors decide within seconds whether to stay. These elements should never be missing:",
        "A clear offer on the homepage, visible contact details, real photos, testimonials and the required legal pages.",
        "Bonus: a clear call to action like “Get in touch” on every page.",
      ],
    },
  },
];
