"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades and slides its children in once they scroll into view.
 * Content renders visible; only elements below the fold are hidden by JS for the
 * fade-in, so nothing stays invisible without JS or IntersectionObserver.
 */
export default function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "visible">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen at load: show immediately without animating
    const r = el.getBoundingClientRect();
    if ((r.top < innerHeight && r.bottom > 0) || !("IntersectionObserver" in window)) {
      setState("visible");
      return;
    }
    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("visible");
        io.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${state === "static" ? "" : "reveal"} ${state === "visible" ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
