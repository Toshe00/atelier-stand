import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "dark" | "light" | "outline" | "gold";
};

const variants = {
  dark: "bg-neutral-950 text-white shadow-[0_12px_30px_rgba(23,18,13,0.18)] hover:bg-neutral-800",
  light: "bg-white text-neutral-950 shadow-[0_12px_30px_rgba(23,18,13,0.12)] hover:bg-stone-100",
  outline:
    "border border-neutral-950/18 text-neutral-950 hover:border-neutral-950 hover:bg-white/70",
  gold: "bg-[#d8a64a] text-neutral-950 shadow-[0_14px_34px_rgba(216,166,74,0.26)] hover:bg-[#efbd5f]",
};

export function ButtonLink({
  className = "",
  variant = "dark",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold tracking-[0.02em] transition duration-300 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
