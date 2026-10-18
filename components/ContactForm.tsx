"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ t }: { t: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
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
