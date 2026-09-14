import { requireAdmin } from "@/lib/session";
import { getProductById } from "@/lib/actions/products";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import DeleteProductForm from "@/components/admin/products/delete-product-form";

export default async function DeleteProductPage({
  params,
}: {
  params: { id: string };
}) {
  await requireAdmin();
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Delete Product
          </CardTitle>
          <CardDescription>
            Are you sure you want to delete "{product.name}"? This action cannot be
            undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted">
              <h3 className="font-medium mb-2">Product Details</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {product.name}</p>
                <p><span className="font-medium">Price:</span> ${product.price.toFixed(2)}</p>
                <p><span className="font-medium">Category:</span> {product.category}</p>
                <p><span className="font-medium">Stock:</span> {product.stock}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link href="/admin/products">Cancel</Link>
              </Button>
              <DeleteProductForm productId={params.id} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
