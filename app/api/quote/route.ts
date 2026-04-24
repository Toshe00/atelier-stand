import { NextResponse } from "next/server";
import { calculateCustomStandPrice, type CustomStandConfig } from "@/lib/pricing";

export async function POST(request: Request) {
  const config = (await request.json()) as CustomStandConfig;

  return NextResponse.json({
    price: calculateCustomStandPrice(config),
    message: "Estimation de devis créée.",
  });
}
