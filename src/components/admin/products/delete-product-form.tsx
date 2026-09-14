"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/lib/actions/products";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteProductFormProps {
  productId: string;
}

export default function DeleteProductForm({ productId }: DeleteProductFormProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(productId);
      toast("Success", { description: "Product deleted successfully" });
      router.push("/admin/products");
    } catch {
      toast("Error", { description: "Failed to delete product" });
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      type="button" 
      variant="destructive" 
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Deleting...
        </>
      ) : (
        "Delete Product"
      )}
    </Button>
  );
}
