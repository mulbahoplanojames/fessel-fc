"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { CartItem } from "@/components/cart-item";

export default function CartPage() {
  const { items, itemCount, subtotal, clearCart } = useCart();

  // Calculate shipping and total
  const shipping = subtotal >= 50 ? 0 : 5;
  const personalizationCost = items.reduce(
    (total, item) => total + (item.personalization ? 10 * item.quantity : 0),
    0
  );
  const total = subtotal + shipping + personalizationCost;

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="mb-6">
        <Link
          href="/shop"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
        <div className="flex items-center text-muted-foreground">
          <ShoppingCart className="h-5 w-5 mr-2" />
          <span>{itemCount} items</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Button asChild>
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-1">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {personalizationCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Personalization
                    </span>
                    <span>${personalizationCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-medium text-lg mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="promo"
                    className="text-sm font-medium mb-1 block"
                  >
                    Promo Code
                  </label>
                  <div className="flex">
                    <Input
                      id="promo"
                      placeholder="Enter code"
                      className="rounded-r-none"
                    />
                    <Button variant="secondary" className="rounded-l-none">
                      Apply
                    </Button>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#e6da46] text-black hover:bg-[#d6ca36]"
                  asChild
                >
                  <Link href="/shop/checkout">Proceed to Checkout</Link>
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Secure checkout powered by Stripe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
