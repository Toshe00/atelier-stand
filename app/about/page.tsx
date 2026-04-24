export default function AboutPage() {
  return (
    <section className="bg-[#f7f0e6] pb-24 pt-32 text-neutral-950 sm:pb-32 sm:pt-40">
      <div className="section-shell max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#9a6a2f]">
          À propos
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-tight tracking-tight sm:text-7xl">
          Des stands pensés comme du mobilier de marque.
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-700">
          Atelier Stand conçoit des structures en bois pour marchés,
          événements, boutiques et salons. Chaque projet associe présence
          visuelle, matières durables et montage pratique.
        </p>
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {["Bois sélectionnés", "Finitions atelier", "Montage pensé terrain"].map(
            (item) => (
              <div
                key={item}
                className="rounded-[8px] border border-neutral-950/10 bg-white/62 p-6 shadow-[0_20px_60px_rgba(89,60,29,0.08)]"
              >
                <p className="font-serif text-2xl text-neutral-950">{item}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
