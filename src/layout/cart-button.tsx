"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartButton() {
  const { itemCount } = useCart();

  return (
    <Link href="/shop/cart" className="relative">
      <Button variant="ghost" size="icon">
        <ShoppingCart className="h-5 w-5" />
        <span className="sr-only">Cart</span>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {itemCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
