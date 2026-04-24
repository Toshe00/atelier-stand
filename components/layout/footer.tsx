import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#f0e4d3] py-14 text-neutral-950">
      <div className="section-shell grid gap-12 border-t border-neutral-950/12 pt-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-serif text-4xl">Atelier Stand</p>
          <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-700">
            Des stands en bois sur mesure pour les marques qui veulent une
            présence retail calme, tactile et durable.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-neutral-700">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-950">
            Explorer
          </p>
          <Link href="/configurator" className="transition hover:text-[#9a6a2f]">
            Créez votre stand
          </Link>
          <Link href="/shop" className="transition hover:text-[#9a6a2f]">
            Voir les modèles
          </Link>
          <Link href="/gallery" className="transition hover:text-[#9a6a2f]">
            Réalisations
          </Link>
        </div>
        <div className="grid gap-3 text-sm text-neutral-700">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-950">
            Studio
          </p>
          <Link href="/contact" className="transition hover:text-[#9a6a2f]">
            Contact
          </Link>
          <span>Réponse sous 24 heures</span>
          <span>Conçu pour marchés, boutiques et salons</span>
        </div>
      </div>
    </footer>
  );
}
