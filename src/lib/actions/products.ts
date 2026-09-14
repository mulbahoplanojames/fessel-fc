"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../prisma";
import { requireAdmin } from "../session";
import { uploadProductImageToCloudinary } from "../upload-to-cloudinary";
import type { Product } from "@/types/product-type";

export async function getProducts(filters?: {
  category?: string;
  status?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  search?: string;
}): Promise<Product[]> {
  try {
    const where: Record<string, unknown> = {
      status: filters?.status || "active",
    };

    if (filters?.category && filters.category !== "all") {
      where.category = filters.category;
    }

    if (filters?.isNew === true) {
      where.isNew = true;
    }

    if (filters?.isBestseller === true) {
      where.isBestseller = true;
    }

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { category: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return products.map((product): Product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      images: Array.isArray(product.images) ? (product.images as string[]) : [],
      description: product.description,
      features: Array.isArray(product.features) ? (product.features as string[]) : [],
      category: product.category,
      sizes: Array.isArray(product.sizes) ? (product.sizes as string[]) : [],
      isNew: product.isNew,
      isBestseller: product.isBestseller,
      reviews: product.reviews as { average: number; count: number } | null,
      stock: product.stock,
      status: product.status,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      images: Array.isArray(product.images) ? (product.images as string[]) : [],
      description: product.description,
      features: Array.isArray(product.features) ? (product.features as string[]) : [],
      category: product.category,
      sizes: Array.isArray(product.sizes) ? (product.sizes as string[]) : [],
      isNew: product.isNew,
      isBestseller: product.isBestseller,
      reviews: product.reviews as { average: number; count: number } | null,
      stock: product.stock,
      status: product.status,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}

export async function createProduct(formData: FormData) {
  try {
    await requireAdmin();

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;
    const isNew = formData.get("isNew") === "true";
    const isBestseller = formData.get("isBestseller") === "true";
    const stock = formData.get("stock") as string;
    const status = formData.get("status") as string;
    
    // Parse arrays from form data
    const images = formData.get("images") as string;
    const features = formData.get("features") as string;
    const sizes = formData.get("sizes") as string;

    if (!name || !price || !category) {
      throw new Error("Name, price, and category are required");
    }

    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadProductImageToCloudinary(imageFile);
    } else {
      throw new Error("Product image is required");
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        image: imageUrl,
        images: images ? JSON.parse(images) : [],
        description: description || "",
        features: features ? JSON.parse(features) : [],
        category,
        sizes: sizes ? JSON.parse(sizes) : [],
        isNew,
        isBestseller,
        stock: parseInt(stock) || 0,
        status: status || "active",
      },
    });

    revalidatePath("/shop");
    revalidatePath("/admin/products");
    revalidatePath("/");

    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    await requireAdmin();

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;
    const isNew = formData.get("isNew") === "true";
    const isBestseller = formData.get("isBestseller") === "true";
    const stock = formData.get("stock") as string;
    const status = formData.get("status") as string;
    
    // Parse arrays from form data
    const images = formData.get("images") as string;
    const features = formData.get("features") as string;
    const sizes = formData.get("sizes") as string;

    const updateData: Record<string, unknown> = {};

    if (name) updateData.name = name;
    if (price) updateData.price = parseFloat(price);
    if (category) updateData.category = category;
    if (description !== null) updateData.description = description;
    if (isNew !== null) updateData.isNew = isNew;
    if (isBestseller !== null) updateData.isBestseller = isBestseller;
    if (stock) updateData.stock = parseInt(stock);
    if (status) updateData.status = status;
    if (images) updateData.images = JSON.parse(images);
    if (features) updateData.features = JSON.parse(features);
    if (sizes) updateData.sizes = JSON.parse(sizes);

    // Only update image if a new file is provided
    if (imageFile && imageFile.size > 0) {
      updateData.image = await uploadProductImageToCloudinary(imageFile);
    }
    // If keepExistingImage is true and no new file, don't update the image field

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/shop");
    revalidatePath("/admin/products");
    revalidatePath(`/shop/${id}`);
    revalidatePath("/");

    return product;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id: string) {
  try {
    await requireAdmin();

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/shop");
    revalidatePath("/admin/products");
    revalidatePath("/");

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}

export async function toggleProductStatus(id: string, status: string) {
  try {
    await requireAdmin();

    const product = await prisma.product.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/shop");
    revalidatePath("/admin/products");

    return product;
  } catch (error) {
    console.error("Error toggling product status:", error);
    throw new Error("Failed to update product status");
  }
}

export async function updateProductStock(id: string, quantity: number) {
  try {
    await requireAdmin();

    const product = await prisma.product.update({
      where: { id },
      data: { stock: quantity },
    });

    revalidatePath("/shop");
    revalidatePath("/admin/products");

    return product;
  } catch (error) {
    console.error("Error updating product stock:", error);
    throw new Error("Failed to update product stock");
  }
}

export async function bulkUpdateProducts(updates: Array<{ id: string; changes: Record<string, unknown> }>) {
  try {
    await requireAdmin();

    const results = await Promise.all(
      updates.map(({ id, changes }) =>
        prisma.product.update({
          where: { id },
          data: changes,
        })
      )
    );

    revalidatePath("/shop");
    revalidatePath("/admin/products");

    return results;
  } catch (error) {
    console.error("Error bulk updating products:", error);
    throw new Error("Failed to bulk update products");
  }
}
