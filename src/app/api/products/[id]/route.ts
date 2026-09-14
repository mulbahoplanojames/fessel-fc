import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

// GET single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formattedProduct = {
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
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name: String(name) }),
        ...(price !== undefined && { price: Number(price) }),
        ...(image !== undefined && { image: String(image) }),
        ...(images !== undefined && { images: Array.isArray(images) ? images : [] }),
        ...(description !== undefined && { description: String(description) }),
        ...(features !== undefined && { features: Array.isArray(features) ? features : [] }),
        ...(category !== undefined && { category: String(category) }),
        ...(sizes !== undefined && { sizes: Array.isArray(sizes) ? sizes : [] }),
        ...(isNew !== undefined && { isNew: Boolean(isNew) }),
        ...(isBestseller !== undefined && { isBestseller: Boolean(isBestseller) }),
        ...(reviews !== undefined && { reviews }),
        ...(stock !== undefined && { stock: Number(stock) }),
        ...(status !== undefined && { status: String(status) }),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
