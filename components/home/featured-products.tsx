import { ProductCard } from "@/components/product/product-card";
import { ButtonLink } from "@/components/ui/button-link";
import { featuredProducts } from "@/lib/products";

export function FeaturedProducts() {
  return (
    <section className="bg-[#fffaf1] py-24 text-neutral-950 sm:py-32">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#9a6a2f]">
              Modèles standards
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
              Des formats prêts à exposer, pensés avec exigence.
            </h2>
          </div>
          <ButtonLink href="/shop" variant="dark">
            Voir tous les modèles
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-9 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
