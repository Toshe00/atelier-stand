import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { standGalleryItems } from "@/lib/stand-gallery";

export default function GalleryPage() {
  return (
    <section className="bg-[#f7f0e6] pb-24 pt-32 text-neutral-950 sm:pb-32 sm:pt-40">
      <div className="section-shell">
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#9a6a2f]">
              Réalisations
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-tight tracking-tight sm:text-7xl">
              Nos réalisations
            </h1>
          </div>
          <p className="max-w-xl text-base leading-8 text-neutral-700 md:justify-self-end">
            Découvrez nos stands en situation réelle
          </p>
        </div>

        <div className="mt-14">
          <GalleryGrid items={standGalleryItems} />
        </div>
      </div>
    </section>
  );
}
