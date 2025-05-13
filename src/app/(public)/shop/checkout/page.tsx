"use client";

import Link from "next/link";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
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
          href="/shop/cart"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="Enter your street address" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter your city" />
                </div>
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    placeholder="Enter your state or province"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip">ZIP/Postal Code</Label>
                  <Input id="zip" placeholder="Enter your ZIP code" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="liberia">Liberia</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <RadioGroup defaultValue="card">
              <div className="flex items-center space-x-2 mb-4">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Credit/Debit Card
                </Label>
              </div>

              <div className="border rounded-lg p-4 mb-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      placeholder="Enter name as it appears on card"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm">
                    {item.name}{" "}
                    <span className="text-muted-foreground">
                      x{item.quantity}
                    </span>
                  </span>
                  <span className="text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{itemCount > 2 ? "Free" : "$6"}</span>
              </div>
            </div>

            <div className="flex justify-between font-medium text-lg mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button
              className="w-full bg-[#e6da46] text-black hover:bg-[#d6ca36]"
              onClick={() => {
                clearCart();
                router.push("/shop");
              }}
            >
              Complete Order
            </Button>

            <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 mr-1" />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
