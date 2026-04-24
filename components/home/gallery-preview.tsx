import Image from "next/image";
import Link from "next/link";
import { galleryPreview } from "@/lib/homepage";

export function GalleryPreview() {
  return (
    <section className="bg-[var(--bone)] py-24 sm:py-32">
      <div className="section-shell">
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--wood)]">
              Réalisations
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
              Créé pour le lieu, le transport et le lancement.
            </h2>
            <Link
              href="/gallery"
              className="mt-8 inline-flex border-b border-neutral-950 pb-1 text-sm font-semibold transition hover:border-transparent"
            >
              Voir la galerie
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {galleryPreview.map((item, index) => (
              <figure
                key={item.title}
                className={`image-lift ${index === 1 ? "sm:translate-y-10" : ""}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-stone-200 shadow-[0_22px_60px_rgba(58,39,22,0.11)]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 24vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 text-sm text-neutral-700">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
