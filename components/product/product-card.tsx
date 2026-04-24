import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/money";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-stone-200 shadow-[0_22px_60px_rgba(89,60,29,0.12)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            loading="eager"
            sizes="(min-width: 768px) 31vw, 90vw"
            className="object-cover transition duration-700 group-hover:scale-[1.045]"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-neutral-950/64 to-transparent px-5 pb-5 pt-16 text-xs font-semibold uppercase tracking-[0.18em] text-white/82">
            <span>{product.usage}</span>
            <span>{product.dimensions}</span>
          </div>
        </div>
        <div className="mt-6 flex items-start justify-between gap-5 border-b border-neutral-950/12 pb-6">
          <div>
            <h3 className="font-serif text-3xl tracking-tight text-neutral-950">
              {product.name}
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-700">
              {product.description}
            </p>
          </div>
          <p className="shrink-0 text-sm font-semibold tracking-[0.02em] text-[#7c5124]">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}
