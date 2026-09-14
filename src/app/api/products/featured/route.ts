import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

// GET featured products (new arrivals and bestsellers)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "8");
    const type = searchParams.get("type"); // "new", "bestseller", or "all"

    const where: Record<string, unknown> = {
      status: "active",
    };

    if (type === "new") {
      where.isNew = true;
    } else if (type === "bestseller") {
      where.isBestseller = true;
    }

    const products = await prisma.product.findMany({
      where,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      isNew: product.isNew,
      isBestseller: product.isBestseller,
    }));

    return NextResponse.json({
      products: formattedProducts,
      total: formattedProducts.length,
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured products" },
      { status: 500 }
    );
  }
}
