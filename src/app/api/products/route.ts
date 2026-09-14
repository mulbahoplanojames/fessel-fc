import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";

// GET all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "active";
    const isNew = searchParams.get("isNew");
    const isBestseller = searchParams.get("isBestseller");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: Record<string, unknown> = {
      status: status,
    };

    if (category && category !== "all" && category !== "") {
      where.category = category;
    }

    if (isNew === "true") {
      where.isNew = true;
    }

    if (isBestseller === "true") {
      where.isBestseller = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.product.count({ where }),
    ]);

    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      images: Array.isArray(product.images) ? product.images : [],
      description: product.description,
      features: Array.isArray(product.features) ? product.features : [],
      category: product.category,
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      isNew: product.isNew,
      isBestseller: product.isBestseller,
      reviews: product.reviews as { average: number; count: number } | null,
      stock: product.stock,
      status: product.status,
    }));

    return NextResponse.json({
      products: formattedProducts,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      price,
      image,
      images,
      description,
      features,
      category,
      sizes,
      isNew,
      isBestseller,
      reviews,
      stock,
      status,
    } = body;

    if (!name || !price || !image || !category) {
      return NextResponse.json(
        { error: "Name, price, image, and category are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: String(name),
        price: Number(price),
        image: String(image),
        images: Array.isArray(images) ? images : [],
        description: String(description || ""),
        features: Array.isArray(features) ? features : [],
        category: String(category),
        sizes: Array.isArray(sizes) ? sizes : [],
        isNew: Boolean(isNew),
        isBestseller: Boolean(isBestseller),
        reviews: reviews || null,
        stock: Number(stock || 0),
        status: String(status || "active"),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
