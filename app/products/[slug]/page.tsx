import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { formatPrice } from "@/lib/money";
import { getProductBySlug, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="bg-[#fffaf1] pb-24 pt-32 text-neutral-950 sm:pb-32 sm:pt-40">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-stone-200 shadow-[0_28px_80px_rgba(89,60,29,0.14)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 92vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9a6a2f]">
            {product.usage}
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-tight tracking-tight sm:text-7xl">
            {product.name}
          </h1>
          <p className="mt-6 text-lg leading-8 text-neutral-700">
            {product.description}
          </p>
          <p className="mt-8 font-serif text-4xl text-neutral-950">
            {formatPrice(product.price)}
          </p>
          <dl className="mt-8 grid gap-4 rounded-[8px] border border-neutral-950/10 bg-white p-6 text-sm shadow-[0_20px_60px_rgba(89,60,29,0.08)]">
            <div className="flex justify-between gap-6">
              <dt className="text-neutral-500">Dimensions</dt>
              <dd className="text-neutral-950">{product.dimensions}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-neutral-500">Usage</dt>
              <dd className="text-neutral-950">{product.usage}</dd>
            </div>
          </dl>
          <ButtonLink href="/cart" variant="dark" className="mt-8">
            Ajouter au panier
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
