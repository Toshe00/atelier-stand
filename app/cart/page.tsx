import { ButtonLink } from "@/components/ui/button-link";

export default function CartPage() {
  return (
    <section className="bg-[#fffaf1] pb-24 pt-32 text-neutral-950 sm:pb-32 sm:pt-40">
      <div className="section-shell max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9a6a2f]">
          Panier
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-tight tracking-tight sm:text-7xl">
          Vos stands sélectionnés
        </h1>
        <div className="mt-10 rounded-[8px] border border-neutral-950/10 bg-white p-8 shadow-[0_20px_60px_rgba(89,60,29,0.08)]">
          <p className="text-neutral-700">
            Le panier est prêt à recevoir les configurations sur mesure. La
            persistance complète sera ajoutée lors de l&apos;intégration e-commerce.
          </p>
        </div>
        <ButtonLink href="/shop" variant="dark" className="mt-8">
          Voir les modèles
        </ButtonLink>
      </div>
    </section>
  );
}
