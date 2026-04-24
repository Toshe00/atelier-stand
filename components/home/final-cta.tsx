import { ButtonLink } from "@/components/ui/button-link";

export function FinalCta() {
  return (
    <section className="bg-[#fffaf1] py-24 text-neutral-950 sm:py-32">
      <div className="section-shell grid gap-10 rounded-[10px] border border-neutral-950/10 bg-[#17120d] p-8 text-[#fffaf1] shadow-[0_28px_90px_rgba(58,39,22,0.16)] md:grid-cols-[1fr_auto] md:items-end md:p-12">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#d8a64a]">
            Lancer un projet
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
            Configurez le stand que votre marque mérite.
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/configurator" variant="gold">Créez votre stand</ButtonLink>
          <ButtonLink href="/contact" variant="light">
            Demander un devis
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
