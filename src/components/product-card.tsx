"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    isNew?: boolean;
    isBestseller?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: "M", // Default size
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border">
      <Link
        href={`/shop/${product.id}`}
        className="aspect-square overflow-hidden"
      >
        <div className="relative h-full w-full transition-transform group-hover:scale-105">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {product.isNew && (
          <Badge className="bg-primary-clr text-black hover:bg-primary-clr/90">
            New
          </Badge>
        )}
        {product.isBestseller && <Badge variant="secondary">Bestseller</Badge>}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-medium">
          <Link href={`/shop/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold">${product.price.toFixed(2)}</p>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
