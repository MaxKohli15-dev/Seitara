"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";

type IndustryOption = { slug: string; name: string };

export default function ContactForm({ t, c, industries }: { t: Dictionary["contact"]; c: Dictionary["configurator"]; industries: IndustryOption[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [industry, setIndustry] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);

  // Industry pages link here with ?industry=<slug>
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const slug = params.get("industry");
    if (slug && industries.some((i) => i.slug === slug)) setIndustry(slug);
    const name = params.get("name");
    const area = document.querySelector<HTMLTextAreaElement>('textarea[name="project"]');
    if (name && area && !area.value) area.value = `${c.prefill} „${name.slice(0, 40)}“. `;
  }, [industries, c.prefill]);

  const toggleNeed = (n: string) => setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("industry", industries.find((i) => i.slug === industry)?.name ?? (industry ? c.other : "-"));
    data.set("needs", needs.join(", ") || "-");
    // Web3Forms forwards every request by email to the address linked to this access key
    data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");
    data.append("subject", `Neue Website-Anfrage von ${data.get("name")}`);
    data.append("from_name", "Vexa Studios Website");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (!json.success) throw new Error();
      setStatus("success");
      form.reset();
      setNeeds([]);
      setIndustry("");
    } catch {
      setStatus("error");
    }
  }

  const field = "mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 outline-none transition focus:border-violet-500";

  if (status === "success") return <p className="card p-8 text-center text-lg">{t.success}</p>;

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 md:p-8">
      <label className="block text-sm font-medium">{t.name}
        <input name="name" required maxLength={100} className={field} autoComplete="name" />
      </label>
      <label className="block text-sm font-medium">{t.email}
        <input name="email" type="email" required maxLength={200} className={field} autoComplete="email" />
      </label>
      <label className="block text-sm font-medium">{c.industry}
        <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={field}>
          <option value="">{c.choose}</option>
          {industries.map((i) => <option key={i.slug} value={i.slug}>{i.name}</option>)}
          <option value="other">{c.other}</option>
        </select>
      </label>
      <fieldset>
        <legend className="text-sm font-medium">{c.needs}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {c.options.map((o) => {
            const on = needs.includes(o);
            return (
              <button key={o} type="button" onClick={() => toggleNeed(o)} aria-pressed={on}
                className={`rounded-lg border px-3.5 py-2 text-sm transition ${on ? "border-violet-500 bg-violet-600/20 text-white" : "border-line text-muted hover:border-violet-500/60"}`}>
                {o}
              </button>
            );
          })}
        </div>
      </fieldset>
      <label className="flex items-center gap-3 text-sm text-muted">
        <input type="checkbox" name="redesign" value="ja" className="h-4 w-4 accent-violet-600" />
        {c.hasSite}
      </label>
      <label className="block text-sm font-medium">{t.project}
        <textarea name="project" required rows={5} maxLength={3000} className={field} />
      </label>
      {/* Honeypot against bots */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? t.sending : t.submit}
      </button>
      {status === "error" && <p className="text-sm text-rose-400">{t.error}</p>}
    </form>
  );
}
