export type MockTheme = { bg: string; fg: string; accent: string; variant: "menu" | "schedule" | "gallery" };
export type MockSite = { name: string; tagline: string; theme: MockTheme };

/** A miniature, styled preview of a website inside a browser frame. */
export default function SiteMock({ site, large = false }: { site: MockSite; large?: boolean }) {
  const { bg, fg, accent, variant } = site.theme;
  const muted = `${fg}99`;
  const soft = `${fg}14`;
  const slug = site.name.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]/g, "");
  const domain = (slug || "deinname") + ".github.io";

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-[#1b1b22]">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#3a3a46]" />
        <span className="h-2 w-2 rounded-full bg-[#3a3a46]" />
        <span className="h-2 w-2 rounded-full bg-[#3a3a46]" />
        <span className="ml-2 truncate rounded bg-[#26262e] px-2 py-0.5 font-mono text-[10px] text-muted">{domain}</span>
      </div>

      <div className="mock-page aspect-[16/10] overflow-hidden" style={{ background: bg, color: fg }} aria-hidden="true">
        <div className={large ? "p-6 md:p-8" : "p-4"}>
          <div className="flex items-center justify-between">
            <span className={`truncate font-semibold ${large ? "text-base" : "text-[11px]"}`}>{site.name || "Dein Name"}</span>
            <span className="flex gap-2">
              {[0, 1, 2].map((i) => <span key={i} className="h-1 w-5 rounded" style={{ background: muted }} />)}
            </span>
          </div>

          <p className={`mt-4 max-w-[80%] font-semibold leading-tight ${large ? "text-3xl md:text-4xl" : "text-base"}`}>{site.tagline}</p>
          <span className={`mt-3 inline-block rounded ${large ? "h-6 w-28" : "h-3 w-14"}`} style={{ background: accent }} />

          <div className={`grid grid-cols-3 ${large ? "mt-8 gap-4" : "mt-4 gap-2"}`}>
            {[0, 1, 2].map((i) =>
              variant === "schedule" ? (
                <div key={i} className="rounded p-2" style={{ background: soft }}>
                  <span className="block h-1.5 w-1/2 rounded" style={{ background: accent }} />
                  <span className="mt-1.5 block h-1 w-4/5 rounded" style={{ background: muted }} />
                  <span className="mt-1 block h-1 w-3/5 rounded" style={{ background: muted }} />
                </div>
              ) : variant === "menu" ? (
                <div key={i}>
                  <div className="aspect-square rounded" style={{ background: i === 1 ? accent : soft, opacity: i === 1 ? 0.85 : 1 }} />
                  <span className="mt-1.5 block h-1 w-3/4 rounded" style={{ background: muted }} />
                </div>
              ) : (
                <div key={i} className="aspect-[4/3] rounded" style={{ background: i === 0 ? accent : soft, opacity: i === 0 ? 0.8 : 1 }} />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
