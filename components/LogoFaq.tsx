"use client";

import Link from "next/link";
import { useRef } from "react";
import Logo from "./Logo";
import Icon from "./Icons";

type Props = {
  locale: string;
  title: string;
  homeLabel: string;
  closeLabel: string;
  faq: { q: string; a: string }[];
};

/** The header logo opens a small FAQ dialog instead of navigating straight home. */
export default function LogoFaq({ locale, title, homeLabel, closeLabel, faq }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  return (
    <>
      <button type="button" onClick={() => ref.current?.showModal()} aria-haspopup="dialog" className="transition-opacity hover:opacity-90">
        <Logo />
      </button>
      <dialog
        ref={ref}
        onClick={(e) => e.target === ref.current && close()}
        className="faq-dialog m-auto w-[min(92vw,560px)] rounded-xl border border-line bg-surface p-0 text-[#ececf3] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button type="button" onClick={close} aria-label={closeLabel} className="rounded-md p-1.5 text-muted hover:bg-bg hover:text-white">
            <Icon name="close" />
          </button>
        </div>
        <div className="max-h-[60vh] space-y-2 overflow-y-auto px-6 py-5">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-lg border border-line bg-bg px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                {f.q}
                <span className="text-muted transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="faq-answer mt-2 text-sm text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="border-t border-line px-6 py-4 text-right">
          <Link href={`/${locale}`} onClick={close} className="text-sm font-medium text-violet-400 hover:text-violet-300">
            {homeLabel} →
          </Link>
        </div>
      </dialog>
    </>
  );
}
