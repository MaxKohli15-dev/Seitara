/** Vector version of the Vexa Studios Sites logo: browser window framed by code brackets. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="vx-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* code brackets */}
      <path d="M13 12 3 24l10 12" fill="none" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M51 12l10 12-10 12" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* window */}
      <rect x="13" y="4" width="38" height="40" rx="4" fill="#f5f5fa" />
      <path d="M17 4h30a4 4 0 0 1 4 4v3H13V8a4 4 0 0 1 4-4z" fill="#0b0b14" />
      <circle cx="18" cy="7.5" r="1.4" fill="#22d3ee" />
      <circle cx="22.5" cy="7.5" r="1.4" fill="#7c3aed" />
      <circle cx="27" cy="7.5" r="1.4" fill="#22d3ee" />
      <rect x="17" y="15" width="11" height="9" rx="1.5" fill="#7c3aed" />
      <rect x="31" y="16" width="15" height="2.5" rx="1.25" fill="#7c3aed" />
      <rect x="31" y="21" width="15" height="2.5" rx="1.25" fill="#7c3aed" />
      <rect x="17" y="29" width="29" height="2.5" rx="1.25" fill="url(#vx-grad)" />
      <rect x="13" y="40" width="38" height="4" rx="2" fill="url(#vx-grad)" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="text-lg font-bold tracking-tight">
        Vexa<span className="text-violet-500">Studios</span>Sites
      </span>
    </span>
  );
}
