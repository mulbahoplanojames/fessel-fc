"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart, type CartItem } from "@/context/cart-context";

interface CartItemProps {
  item: CartItem;
}

export function CartItem({ item }: CartItemProps) {
  const { updateItem, removeItem } = useCart();

  const increaseQuantity = () => {
    updateItem(item.id, { quantity: item.quantity + 1 });
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateItem(item.id, { quantity: item.quantity - 1 });
    } else {
      removeItem(item.id);
    }
  };

  return (
    <div className="flex items-center py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="ml-4 flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <div className="text-sm text-muted-foreground mt-1">
          {item.size && <p>Size: {item.size}</p>}
          {item.personalization?.name && (
            <p>Name: {item.personalization.name}</p>
          )}
          {item.personalization?.number && (
            <p>Number: {item.personalization.number}</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={decreaseQuantity}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <div className="h-8 w-10 flex items-center justify-center border-y">
              {item.quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={increaseQuantity}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove item</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
