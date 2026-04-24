import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { standGalleryItems } from "@/lib/stand-gallery";

export function Gallery() {
  return (
    <section className="bg-[var(--bone)] px-4 py-5 sm:py-6">
      <div className="mx-auto w-[min(100%,1080px)]">
        <h2 className="text-center font-serif text-2xl leading-tight tracking-tight text-neutral-950 sm:text-3xl">
          Découvrez nos réalisations
        </h2>
        <div className="mt-4">
          <GalleryGrid items={standGalleryItems} compact />
        </div>
      </div>
    </section>
  );
}
