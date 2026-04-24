import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atelierstand.com"),
  title: {
    default: "Atelier Stand | Stands en bois sur mesure pour marques premium",
    template: "%s | Atelier Stand",
  },
  description:
    "Stands en bois sur mesure et modèles standards pour événements, marchés, lancements retail et salons professionnels.",
  keywords: [
    "stands en bois sur mesure",
    "stands événementiels",
    "présentoir marché",
    "mobilier retail",
    "stands d'exposition",
  ],
  openGraph: {
    title: "Atelier Stand",
    description:
      "Des stands en bois conçus pour valoriser les marques sur les marchés, en boutique et en salon.",
    images: ["/images/stand-cheese.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full scroll-smooth">
      <body className="flex min-h-full flex-col bg-[#080705] text-[#f7efe2] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
