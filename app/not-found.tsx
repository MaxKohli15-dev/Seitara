import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="de">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-5xl font-bold gradient-text">404</h1>
        <Link href="/de" className="btn-primary">Zur Startseite</Link>
      </body>
    </html>
  );
}
