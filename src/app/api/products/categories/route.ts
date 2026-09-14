import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

// GET all product categories
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { status: "active" },
      select: { category: true },
      distinct: ["category"],
    });

    const categories = [...new Set(products.map((p) => p.category))];

    return NextResponse.json({
      categories: categories.sort(),
      total: categories.length,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
