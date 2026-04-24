import { valueProps } from "@/lib/homepage";

export function ValueProps() {
  return (
    <section className="bg-[#f7f0e6] py-24 text-neutral-950 sm:py-32">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#9a6a2f]">
              Conçu pour les espaces commerciaux
            </p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
              Une structure élégante pour les marques en mouvement.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-neutral-700">
            Chaque stand est pensé comme un mobilier de marque: lisible de loin,
            robuste sur site, précis dans les détails.
          </p>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {valueProps.map((item) => (
            <article
              key={item.title}
              className="rounded-[8px] border border-neutral-950/10 bg-white/58 p-7 shadow-[0_24px_70px_rgba(89,60,29,0.08)]"
            >
              <h3 className="font-serif text-3xl tracking-tight text-neutral-950">
                {item.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-neutral-700">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
