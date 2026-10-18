"use client";

import { useEffect, useState } from "react";
import SiteMock, { type MockSite } from "./SiteMock";
import Icon from "./Icons";

/** Cycles through example sites with a crossfade; pauses on hover. */
export default function HeroPreview({ sites, badge }: { sites: MockSite[]; badge: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % sites.length), 3800);
    return () => clearInterval(id);
  }, [paused, sites.length]);

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* back card peeking out */}
      <div className="absolute inset-x-6 -top-4 h-full rounded-lg border border-line bg-surface opacity-60" aria-hidden="true" />
      <div className="relative grid">
        {sites.map((s, n) => (
          <div
            key={s.name}
            className="col-start-1 row-start-1 transition-all duration-700 ease-out"
            style={{ opacity: n === i ? 1 : 0, transform: n === i ? "none" : "translateY(8px) scale(.985)" }}
            aria-hidden={n !== i}
          >
            <SiteMock site={s} large />
          </div>
        ))}
      </div>

      <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-lg shadow-black/40">
        <span className="text-violet-400"><Icon name="check" className="h-4 w-4" /></span>
        {badge}
      </div>

      <div className="mt-8 flex justify-end gap-1.5">
        {sites.map((s, n) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setI(n)}
            aria-label={s.name}
            className={`h-1.5 rounded-full transition-all duration-300 ${n === i ? "w-6 bg-violet-500" : "w-1.5 bg-line hover:bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
}
