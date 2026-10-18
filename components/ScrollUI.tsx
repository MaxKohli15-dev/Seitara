"use client";

import { useEffect, useState } from "react";
import Icon from "./Icons";

/** Thin gradient reading-progress bar at the top plus a back-to-top button. */
export default function ScrollUI({ label }: { label: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? scrollY / max : 0);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  const showTop = progress > 0.15;

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[60] h-0.5 origin-left bg-violet-500"
        style={{ width: "100%", transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={label}
        className={`fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface/90 backdrop-blur transition-all duration-300 hover:border-violet-500 ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <Icon name="arrowUp" className="h-4 w-4" />
      </button>
    </>
  );
}
