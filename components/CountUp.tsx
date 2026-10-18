"use client";

import { useEffect, useRef, useState } from "react";

/** Counts from 0 up to `value` once the number scrolls into view. */
export default function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only animate numbers that start below the fold; otherwise keep the final value
    const r = el.getBoundingClientRect();
    if ((r.top < innerHeight && r.bottom > 0) || !("IntersectionObserver" in window)) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    setN(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = Date.now();
      // setInterval (not rAF) so the final value is always reached, even in background tabs
      timer = setInterval(() => {
        const p = Math.min((Date.now() - start) / 1400, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p >= 1) clearInterval(timer);
      }, 16);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [value]);

  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}
