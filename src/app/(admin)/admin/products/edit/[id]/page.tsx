import { requireAdmin } from "@/lib/session";
import { getProductById } from "@/lib/actions/products";
import ProductForm from "@/components/admin/products/product-form";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground">
          Update product details and inventory
        </p>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
