import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    lines: [],
    message: "L'API panier est prête pour une persistance complète.",
  });
}

export async function POST(request: Request) {
  const line = await request.json();

  return NextResponse.json({
    line,
    message: "Ligne panier acceptée.",
  });
}
