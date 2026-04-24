import { FeaturedProducts } from "@/components/home/featured-products";
import { FinalCta } from "@/components/home/final-cta";
import { Gallery } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { Testimonials } from "@/components/home/testimonials";
import { ValueProps } from "@/components/home/value-props";

export default function Home() {
  return (
    <>
      <Hero />
      <Gallery />
      <ValueProps />
      <FeaturedProducts />
      <Testimonials />
      <FinalCta />
    </>
  );
}
