import type { Locale } from "./i18n";

/** Operator details shown in imprint and privacy policy. Fill in `name` with the full legal name. */
export const OPERATOR = {
  brand: "Seitara",
  name: "",
  country: { de: "Schweiz", en: "Switzerland" },
  email: "Fiscord.noreply@gmail.com",
};

export const LEGAL_UPDATED = "2026-10-18";

type Section = { title: string; body: string[] };

const operatorLine = (locale: Locale) =>
  OPERATOR.name ? `${OPERATOR.brand}, ${OPERATOR.name}, ${OPERATOR.country[locale]}` : `${OPERATOR.brand}, ${OPERATOR.country[locale]}`;

export function imprint(locale: Locale): Section[] {
  const op = operatorLine(locale);
  if (locale === "en") {
    return [
      { title: "Responsible for this website", body: [op, `Email: ${OPERATOR.email}`] },
      { title: "Nature of the offer", body: ["Seitara is a private, non-commercial project. Websites are created free of charge. No goods or paid services are offered on this website."] },
      { title: "Liability for content", body: ["The content of this website was created with great care. However, we cannot guarantee that it is correct, complete or up to date."] },
      { title: "Liability for links", body: ["This website contains links to external websites. We have no influence on their content and accept no liability for it. The respective operator is always responsible for the content of linked pages."] },
      { title: "Copyright", body: ["Texts, graphics, the logo and the video on this website are protected by copyright. Any use beyond what is permitted by law requires our prior written consent."] },
      { title: "Image credits", body: ["Photos: Unsplash (unsplash.com), used under the Unsplash License."] },
    ];
  }
  return [
    { title: "Verantwortlich für diese Website", body: [op, `E-Mail: ${OPERATOR.email}`] },
    { title: "Art des Angebots", body: ["Seitara ist ein privates, nicht kommerzielles Projekt. Websites werden kostenlos erstellt. Auf dieser Website werden keine Waren oder kostenpflichtigen Dienstleistungen angeboten."] },
    { title: "Haftung für Inhalte", body: ["Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität können wir jedoch keine Gewähr übernehmen."] },
    { title: "Haftung für Links", body: ["Diese Website enthält Links zu externen Websites. Auf deren Inhalte haben wir keinen Einfluss und übernehmen dafür keine Haftung. Für die Inhalte verlinkter Seiten ist stets der jeweilige Betreiber verantwortlich."] },
    { title: "Urheberrecht", body: ["Texte, Grafiken, das Logo und das Video auf dieser Website sind urheberrechtlich geschützt. Jede Verwendung ausserhalb der gesetzlichen Schranken bedarf unserer vorherigen schriftlichen Zustimmung."] },
    { title: "Bildnachweis", body: ["Fotos: Unsplash (unsplash.com), verwendet unter der Unsplash-Lizenz."] },
  ];
}

export function privacy(locale: Locale): Section[] {
  const op = operatorLine(locale);
  if (locale === "en") {
    return [
      { title: "1. Overview", body: ["This privacy policy explains which personal data is processed when you visit this website or contact us. It is based on the Swiss Federal Act on Data Protection (FADP) and, where applicable to visitors from the EU, the General Data Protection Regulation (GDPR)."] },
      { title: "2. Controller", body: [op, `Email: ${OPERATOR.email}`] },
      { title: "3. Hosting via GitHub Pages", body: [
        "This website is hosted by GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. When you visit the website, GitHub automatically processes technical data such as your IP address, date and time of access, the page requested and browser information in server logs. This is necessary to deliver the website securely.",
        "Data may be transferred to the USA. GitHub is certified under the EU-U.S. and Swiss-U.S. Data Privacy Framework. More information: GitHub Privacy Statement (docs.github.com/site-policy/privacy-policies).",
      ] },
      { title: "4. Contact form (Web3Forms)", body: [
        "If you use our contact form, the data you enter (name, email, industry, desired features, project description) is transmitted to Web3Forms and forwarded to us by email. We use this data only to answer your request and to create your website.",
        "The data is stored for as long as needed to process your request and deleted afterwards, unless there are legal retention obligations. Legal basis under GDPR: Art. 6(1)(b) and (f).",
      ] },
      { title: "5. Email", body: ["If you contact us by email, we process your email address and the content of your message to answer your request. Our email provider is Google (Gmail), which may process data in the USA."] },
      { title: "6. Fonts, images and video", body: ["Fonts, photos and the tutorial video are served directly from this website. No connection is made to Google Fonts, YouTube, Unsplash or similar services."] },
      { title: "7. Cookies and tracking", body: ["This website does not use cookies, analytics or advertising tools. Your browser may store small amounts of technical data locally, which are not used to track you."] },
      { title: "8. Your rights", body: ["You have the right to information about your stored data and the right to have it corrected or deleted. You may also object to processing or request restriction. To exercise your rights, simply write to us by email. You may also lodge a complaint with the Federal Data Protection and Information Commissioner (FDPIC) or, if you live in the EU, with your local data protection authority."] },
      { title: "9. Changes", body: [`This privacy policy may be updated when the website changes. Last updated: ${LEGAL_UPDATED}.`] },
    ];
  }
  return [
    { title: "1. Überblick", body: ["Diese Datenschutzerklärung informiert darüber, welche Personendaten beim Besuch dieser Website oder bei einer Kontaktaufnahme bearbeitet werden. Sie richtet sich nach dem Schweizer Datenschutzgesetz (DSG) und, soweit für Besucher aus der EU anwendbar, nach der Datenschutz-Grundverordnung (DSGVO)."] },
    { title: "2. Verantwortlich", body: [op, `E-Mail: ${OPERATOR.email}`] },
    { title: "3. Hosting über GitHub Pages", body: [
      "Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf der Website verarbeitet GitHub automatisch technische Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Seite und Browser-Informationen in Server-Logfiles. Dies ist für die sichere Auslieferung der Website erforderlich.",
      "Dabei können Daten in die USA übermittelt werden. GitHub ist unter dem EU-U.S. und Swiss-U.S. Data Privacy Framework zertifiziert. Weitere Informationen: GitHub Privacy Statement (docs.github.com/site-policy/privacy-policies).",
    ] },
    { title: "4. Kontaktformular (Web3Forms)", body: [
      "Wenn du unser Kontaktformular nutzt, werden die eingegebenen Daten (Name, E-Mail, Branche, gewünschte Funktionen, Projektbeschreibung) an den Dienst Web3Forms übermittelt und per E-Mail an uns weitergeleitet. Wir verwenden diese Daten ausschliesslich, um deine Anfrage zu beantworten und deine Website zu erstellen.",
      "Die Daten werden gespeichert, solange es für die Bearbeitung deiner Anfrage nötig ist, und danach gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen. Rechtsgrundlage nach DSGVO: Art. 6 Abs. 1 lit. b und f.",
    ] },
    { title: "5. E-Mail", body: ["Wenn du uns per E-Mail kontaktierst, bearbeiten wir deine E-Mail-Adresse und den Inhalt deiner Nachricht, um deine Anfrage zu beantworten. Unser E-Mail-Anbieter ist Google (Gmail); dabei können Daten in den USA bearbeitet werden."] },
    { title: "6. Schriftarten, Bilder und Video", body: ["Schriftarten, Fotos und das Tutorial-Video werden direkt von dieser Website ausgeliefert. Es wird keine Verbindung zu Google Fonts, YouTube, Unsplash oder ähnlichen Diensten hergestellt."] },
    { title: "7. Cookies und Tracking", body: ["Diese Website verwendet keine Cookies, keine Analyse- und keine Werbe-Tools. Dein Browser speichert höchstens technisch notwendige Daten lokal, die nicht zu deiner Verfolgung genutzt werden."] },
    { title: "8. Deine Rechte", body: ["Du hast das Recht auf Auskunft über deine gespeicherten Daten sowie auf Berichtigung und Löschung. Ausserdem kannst du der Bearbeitung widersprechen oder eine Einschränkung verlangen. Schreib uns dafür einfach eine E-Mail. Du kannst dich zudem beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) beschweren oder, wenn du in der EU wohnst, bei deiner zuständigen Datenschutzbehörde."] },
    { title: "9. Änderungen", body: [`Diese Datenschutzerklärung kann angepasst werden, wenn sich die Website ändert. Stand: ${LEGAL_UPDATED}.`] },
  ];
}
