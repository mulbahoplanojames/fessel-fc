import { requireAdmin } from "@/lib/session";
import ProductForm from "@/components/admin/products/product-form";

export default async function AddProductPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground">
          Create a new product for your shop inventory
        </p>
      </div>
      <ProductForm />
    </div>
  );
}
