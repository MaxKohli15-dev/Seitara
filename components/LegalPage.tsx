type Section = { title: string; body: string[] };

export default function LegalPage({ title, sections }: { title: string; sections: Section[] }) {
  return (
    <article className="mx-auto max-w-2xl px-4 pt-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-lg font-semibold">{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-2 leading-relaxed text-muted">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
