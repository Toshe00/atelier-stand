import Image from "next/image";
import Link from "next/link";

const heroLinks = [
  {
    href: "/",
    label: "Accueil Atelier Stand",
    className: "left-[3.8%] top-[2.4%] h-[9.2%] w-[18.6%]",
  },
  {
    href: "/configurator",
    label: "Configurateur",
    className: "left-[32.4%] top-[3.3%] h-[7.5%] w-[9.6%]",
  },
  {
    href: "/shop",
    label: "Boutique",
    className: "left-[42.9%] top-[3.3%] h-[7.5%] w-[6.5%]",
  },
  {
    href: "/gallery",
    label: "Réalisations",
    className: "left-[50%] top-[3.3%] h-[7.5%] w-[9.2%]",
  },
  {
    href: "/about",
    label: "À propos",
    className: "left-[59.2%] top-[3.3%] h-[7.5%] w-[7.2%]",
  },
  {
    href: "/contact",
    label: "Contact",
    className: "left-[66.2%] top-[3.3%] h-[7.5%] w-[7.8%]",
  },
  {
    href: "/cart",
    label: "Panier",
    className: "left-[79.1%] top-[2.7%] h-[8.2%] w-[3.4%]",
  },
  {
    href: "/configurator",
    label: "Créer mon stand",
    className: "left-[82.2%] top-[2.5%] h-[8.2%] w-[13.2%]",
  },
  {
    href: "/configurator",
    label: "Créer votre stand",
    className: "left-[5.4%] top-[69.2%] h-[8.2%] w-[16.6%]",
  },
  {
    href: "/shop",
    label: "Voir les modèles",
    className: "left-[23%] top-[69.2%] h-[8.2%] w-[13.9%]",
  },
];

export function Hero() {
  return (
    <section className="bg-[#080705]">
      <div className="relative aspect-[1780/883] w-full overflow-hidden">
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
