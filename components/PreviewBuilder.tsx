"use client";

import Link from "next/link";
import { useState } from "react";
import SiteMock, { type MockTheme } from "./SiteMock";
import type { Dictionary } from "@/lib/i18n";

type IndustryOption = { slug: string; name: string; tagline: string; variant: MockTheme["variant"]; image: string };

const styles = {
  dark: { bg: "#111116", fg: "#f1f1f4" },
  light: { bg: "#f6f6f8", fg: "#1c1c22" },
  warm: { bg: "#f5ede3", fg: "#3a2a1f" },
} as const;
const accents = ["#7c3aed", "#2563eb", "#16a34a", "#ea580c", "#db2777", "#0891b2"];

/** Lets visitors try out name, industry, style and colour and see a live preview. */
export default function PreviewBuilder({ locale, t, industries }: { locale: string; t: Dictionary["builder"]; industries: IndustryOption[] }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState(industries[0].slug);
  const [style, setStyle] = useState<keyof typeof styles>("dark");
  const [accent, setAccent] = useState(accents[0]);

  const ind = industries.find((i) => i.slug === slug) ?? industries[0];
  const theme: MockTheme = { ...styles[style], accent, variant: ind.variant };
  const href = `/${locale}/contact?industry=${slug}${name ? `&name=${encodeURIComponent(name)}` : ""}`;
  const field = "mt-2 w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-500";

  return (
    <div className="card grid gap-8 p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-5">
        <label className="block text-sm font-medium">{t.name}
          <input value={name} onChange={(e) => setName(e.target.value.slice(0, 28))} placeholder={t.namePlaceholder} className={field} />
        </label>
        <label className="block text-sm font-medium">{t.industry}
          <select value={slug} onChange={(e) => setSlug(e.target.value)} className={field}>
            {industries.map((i) => <option key={i.slug} value={i.slug}>{i.name}</option>)}
          </select>
        </label>
        <fieldset>
          <legend className="text-sm font-medium">{t.style}</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(Object.keys(styles) as (keyof typeof styles)[]).map((k) => (
              <button key={k} type="button" onClick={() => setStyle(k)} aria-pressed={style === k}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${style === k ? "border-violet-500 text-white" : "border-line text-muted hover:border-[#3d3d4a]"}`}>
                <span className="h-3.5 w-3.5 rounded-sm border border-white/20" style={{ background: styles[k].bg }} />
                {t.styles[k]}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium">{t.color}</legend>
          <div className="mt-2 flex gap-2.5">
            {accents.map((a) => (
              <button key={a} type="button" onClick={() => setAccent(a)} aria-label={a} aria-pressed={accent === a}
                className={`h-7 w-7 rounded-full transition-transform duration-200 hover:scale-110 ${accent === a ? "ring-2 ring-white ring-offset-2 ring-offset-[#141419]" : ""}`}
                style={{ background: a }} />
            ))}
          </div>
        </fieldset>
        <Link href={href} className="btn-primary group w-full">{t.cta}<span className="btn-arrow">→</span></Link>
      </div>

      <div className="self-center">
        <div key={slug} className="swap-in">
          <SiteMock site={{ name: name || t.namePlaceholder, tagline: ind.tagline, theme, image: ind.image }} large />
        </div>
        <p className="mt-3 text-xs text-muted">{t.note}</p>
      </div>
    </div>
  );
}
