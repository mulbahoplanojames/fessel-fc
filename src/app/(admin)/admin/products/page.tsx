import { requireAdmin } from "@/lib/session";
import { getProducts } from "@/lib/actions/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/types/product-type";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; status?: string; search?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  
  const products = await getProducts({
    category: params.category,
    status: params.status,
    search: params.search,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your shop inventory and product details
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <form className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9"
            name="search"
            defaultValue={params.search}
          />
        </div>
        <Select name="category" defaultValue={params.category || "all"}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="kits">Kits</SelectItem>
            <SelectItem value="training">Training Wear</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
            <SelectItem value="souvenirs">Souvenirs</SelectItem>
          </SelectContent>
        </Select>
        <Select name="status" defaultValue={params.status || "active"}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Filter</Button>
        <Button 
          type="button" 
          variant="outline"
          onClick={() => redirect("/admin/products")}
        >
          Reset
        </Button>
      </form>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Image</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Badges</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    No products found. Create your first product to get started.
                  </td>
                </tr>
              ) : (
                products.map((product: Product) => (
                  <tr key={product.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-12 rounded overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{product.category}</Badge>
                    </td>
                    <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          product.status === "active"
                            ? "default"
                            : product.status === "draft"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {product.isNew && (
                          <Badge className="bg-primary-clr text-black">
                            New
                          </Badge>
                        )}
                        {product.isBestseller && (
                          <Badge variant="secondary">Bestseller</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/products/edit/${product.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          asChild
                        >
                          <Link href={`/admin/products/delete/${product.id}`}>
                            <Trash2 className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
