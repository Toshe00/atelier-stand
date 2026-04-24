import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/products";

export default function ShopPage() {
  return (
    <section className="bg-[#fffaf1] pb-24 pt-32 text-neutral-950 sm:pb-32 sm:pt-40">
      <div className="section-shell">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9a6a2f]">
          Stands standards
        </p>
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <h1 className="mt-4 font-serif text-5xl leading-tight tracking-tight sm:text-7xl">
            Voir les modèles
          </h1>
          <p className="max-w-2xl text-base leading-8 text-neutral-700 lg:justify-self-end">
            Des formats prêts à installer, avec les mêmes finitions que nos
            créations sur mesure.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3 text-sm text-neutral-700">
          <span className="rounded-full border border-neutral-950/12 bg-white/70 px-4 py-2">
            Prix
          </span>
          <span className="rounded-full border border-neutral-950/12 bg-white/70 px-4 py-2">
            Taille
          </span>
          <span className="rounded-full border border-neutral-950/12 bg-white/70 px-4 py-2">
            Usage
          </span>
        </div>
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
