export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  dimensions: string;
  usage: "Marché" | "Retail" | "Salon";
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "market-01",
    slug: "market-display-stand",
    name: "Stand marché modulable",
    price: 1280,
    image: "/images/model-market.png",
    description: "Étagères compactes et modulables pour marchés et pop-ups.",
    dimensions: "160 x 210 x 60 cm",
    usage: "Marché",
    featured: true,
  },
  {
    id: "retail-01",
    slug: "retail-launch-wall",
    name: "Mur retail en noyer",
    price: 2140,
    image: "/images/model-retail.png",
    description: "Un mur de présentation raffiné avec points lumineux intégrés.",
    dimensions: "240 x 230 x 50 cm",
    usage: "Retail",
    featured: true,
  },
  {
    id: "exhibit-01",
    slug: "exhibition-island",
    name: "Îlot d'exposition",
    price: 2890,
    image: "/images/model-exhibit.png",
    description: "Structure autoportante pour démonstrations produit premium.",
    dimensions: "300 x 230 x 120 cm",
    usage: "Salon",
    featured: true,
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
