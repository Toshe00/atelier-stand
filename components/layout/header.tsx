"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";

const navItems = [
  { href: "/configurator", label: "Configurateur" },
  { href: "/shop", label: "Boutique" },
  { href: "/gallery", label: "Réalisations" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#080705]/78 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-[min(100%-2rem,1180px)] items-center justify-between gap-4 lg:w-[min(100%-6rem,1180px)]">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="flex size-10 items-center justify-center text-[#d8a64a]">
            <LogoMark />
          </span>
          <span>
            <span className="block whitespace-nowrap text-xs font-bold uppercase tracking-[0.22em] sm:text-sm sm:tracking-[0.34em]">
              Atelier Stand
            </span>
            <span className="mt-1 hidden whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] text-white/58 sm:block xl:text-[10px] xl:tracking-[0.24em]">
              Créateur de stands en bois
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-[11px] font-bold uppercase tracking-[0.06em] text-white/82 lg:flex xl:gap-8 xl:text-xs xl:tracking-[0.08em]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[#d8a64a]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="hidden items-center gap-2 text-[#d8a64a] transition hover:text-white sm:flex"
            aria-label="Panier"
          >
            <CartIcon />
          </Link>
          <ButtonLink
            href="/configurator"
            variant="gold"
            className="min-h-11 rounded-[4px] px-5 text-[11px] uppercase tracking-[0.08em] xl:px-6 xl:text-xs"
          >
            Créer mon stand
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 42 42" className="size-10" aria-hidden="true">
      <path
        d="M10 34V8l12-4 10 4v26l-10-4-12 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 31V12l8-2 5 2v19M16 12l8 3 5-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 28 28" className="size-6" aria-hidden="true">
      <path
        d="M8 11h14l-1.4 10H9.3L8 11ZM11 11a3 3 0 0 1 6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21.5" cy="7.5" r="3" fill="currentColor" />
    </svg>
  );
}
