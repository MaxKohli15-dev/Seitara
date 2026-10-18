"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = readonly [href: string, label: string];

/** Sticky header that tightens on scroll, highlights the active page and has a mobile menu. */
export default function HeaderShell({ logo, actions, links, cta, menuLabel }: {
  logo: React.ReactNode;
  actions: React.ReactNode;
  links: NavLink[];
  cta: NavLink;
  menuLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 8);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  const isActive = (href: string) => path?.replace(/\/$/, "").endsWith(href);

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-bg"}`}>
      <nav className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-[padding] duration-300 ${scrolled ? "py-2.5" : "py-4"}`}>
        {logo}
        <ul className="hidden items-center gap-7 text-sm md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <Link href={href} className={`nav-link ${isActive(href) ? "is-active text-white" : "text-muted hover:text-white"}`}>{label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          {actions}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={menuLabel}
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-line md:hidden"
          >
            <span className={`absolute h-px w-4 bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span className={`absolute h-px w-4 bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>
      </nav>

      <div className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <ul className="min-h-0 px-4">
          {[...links, cta].map(([href, label], i) => (
            <li key={`${href}-${i}`} className="mobile-item border-t border-line" style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }} data-open={open}>
              <Link href={href} className={`flex items-center justify-between py-3.5 ${isActive(href) ? "text-white" : "text-muted"}`}>
                {label}<span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
