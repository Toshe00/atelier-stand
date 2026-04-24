"use client";

import Image from "next/image";
import { useState } from "react";
import type { StandGalleryItem } from "@/lib/stand-gallery";

type GalleryGridProps = {
  items: StandGalleryItem[];
  compact?: boolean;
};

export function GalleryGrid({ items, compact = false }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<StandGalleryItem | null>(
    null,
  );

  return (
    <>
      <div
        className={`grid grid-cols-1 md:grid-cols-3 ${compact ? "gap-5" : "gap-6"}`}
      >
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setSelectedImage(item)}
            className="group text-left"
            aria-label={`Agrandir ${item.title}`}
          >
            <figure>
              <div
                className={`relative aspect-[4/3] overflow-hidden bg-stone-200 shadow-[0_22px_60px_rgba(58,39,22,0.12)] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_80px_rgba(58,39,22,0.18)] ${
                  compact ? "rounded-[6px]" : "rounded-[8px]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="eager"
                  sizes="(min-width: 768px) 31vw, 92vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.045]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-neutral-950/72 to-transparent px-5 pb-5 pt-16">
                  <figcaption className="text-xs font-bold uppercase tracking-[0.2em] text-white/86">
                    {item.title}
                  </figcaption>
                </div>
              </div>
            </figure>
          </button>
        ))}
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-neutral-950/86 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950 shadow-[0_14px_40px_rgba(0,0,0,0.25)] transition hover:bg-stone-100"
            onClick={() => setSelectedImage(null)}
          >
            Fermer
          </button>
          <div
            className="relative aspect-[4/3] w-full max-w-6xl overflow-hidden rounded-[8px] bg-neutral-900 shadow-[0_34px_110px_rgba(0,0,0,0.4)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
