export default function ContactPage() {
  return (
    <section className="bg-[#fffaf1] pb-24 pt-32 text-neutral-950 sm:pb-32 sm:pt-40">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9a6a2f]">
            Contact
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-tight tracking-tight sm:text-7xl">
            Parlez-nous de votre projet
          </h1>
          <p className="mt-6 max-w-md text-neutral-700">
            Nous répondons sous 24 heures avec une première direction claire:
            budget, contraintes, délais et finitions possibles.
          </p>
        </div>
        <form className="grid gap-5 rounded-[8px] border border-neutral-950/10 bg-white p-6 shadow-[0_24px_70px_rgba(89,60,29,0.1)] sm:p-8">
          <label className="grid gap-2 text-sm font-semibold">
            Nom
            <input className="min-h-12 rounded-[4px] border border-neutral-950/14 bg-[#fffaf1] px-4 font-normal text-neutral-950 outline-none transition focus:border-[#9a6a2f]" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Email
            <input
              type="email"
              className="min-h-12 rounded-[4px] border border-neutral-950/14 bg-[#fffaf1] px-4 font-normal text-neutral-950 outline-none transition focus:border-[#9a6a2f]"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Détails du projet
            <textarea className="min-h-36 rounded-[4px] border border-neutral-950/14 bg-[#fffaf1] p-4 font-normal text-neutral-950 outline-none transition focus:border-[#9a6a2f]" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Ajouter une référence
            <input type="file" className="text-sm font-normal text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#17120d] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />
          </label>
          <button
            type="button"
            className="min-h-12 rounded-full bg-[#d8a64a] px-6 text-sm font-semibold text-neutral-950 shadow-[0_14px_34px_rgba(216,166,74,0.22)] transition hover:bg-[#efbd5f]"
          >
            Demander un devis
          </button>
        </form>
      </div>
    </section>
  );
}
