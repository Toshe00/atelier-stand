import Image from "next/image";
import Link from "next/link";

const heroLinks = [
  {
    href: "/",
    label: "Accueil Atelier Stand",
    className: "left-[3.6%] top-[2.4%] h-[11%] w-[18.8%]",
  },
  {
    href: "/configurator",
    label: "Configurateur",
    className: "left-[31.7%] top-[3.3%] h-[7.2%] w-[10.4%]",
  },
  {
    href: "/shop",
    label: "Boutique",
    className: "left-[43.1%] top-[3.3%] h-[7.2%] w-[6.6%]",
  },
  {
    href: "/gallery",
    label: "Réalisations",
    className: "left-[50.1%] top-[3.3%] h-[7.2%] w-[9.2%]",
  },
  {
    href: "/about",
    label: "À propos",
    className: "left-[59.6%] top-[3.3%] h-[7.2%] w-[7%]",
  },
  {
    href: "/contact",
    label: "Contact",
    className: "left-[66.7%] top-[3.3%] h-[7.2%] w-[7.7%]",
  },
  {
    href: "/cart",
    label: "Panier",
    className: "left-[79.1%] top-[2.6%] h-[7.7%] w-[4.4%]",
  },
  {
    href: "/configurator",
    label: "Créer mon stand",
    className: "left-[82.4%] top-[2.3%] h-[8.1%] w-[13.2%]",
  },
  {
    href: "/configurator",
    label: "Créer votre stand",
    className: "left-[5.6%] top-[70.6%] h-[7.1%] w-[16.3%]",
  },
  {
    href: "/shop",
    label: "Voir les modèles",
    className: "left-[23.3%] top-[70.6%] h-[7.1%] w-[13.3%]",
  },
];

export function Hero() {
  return (
    <section className="bg-[#080705]">
      <div className="relative aspect-[1536/762] w-full overflow-hidden">
        <Image
          src="/images/home-pages.png"
          alt="Atelier Stand - des stands en bois sur mesure pour sublimer votre marque"
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
        {heroLinks.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            aria-label={link.label}
            className={`absolute z-20 block rounded-[4px] outline-none transition focus-visible:ring-2 focus-visible:ring-[#e0ad4f] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${link.className}`}
          />
        ))}
      </div>
    </section>
  );
}
