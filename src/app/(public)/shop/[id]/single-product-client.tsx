"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/context/cart-context";
import products from "@/data/products.json";
import { Product } from "@/types/product-type";

export default function SingleProductClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [personalization, setPersonalization] = useState({
    name: "",
    number: "",
  });

  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">
          Sorry, the product you are looking for does not exist.
        </p>
        <Button asChild>
          <Link href="/shop">Return to Shop</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images![0],
      quantity,
      size: selectedSize,
      personalization:
        personalization.name || personalization.number
          ? {
              name: personalization.name || undefined,
              number: personalization.number || undefined,
            }
          : null,
    });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="mb-6">
        <Link
          href="/shop"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="aspect-square relative overflow-hidden rounded-lg border">
            <Image
              src={product?.images![selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product?.images?.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "aspect-square relative overflow-hidden rounded-lg border cursor-pointer",
                  selectedImage === index && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {product.isNew && (
                <span className="bg-[#e6da46] text-black text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                  New
                </span>
              )}
              {product.isBestseller && (
                <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Bestseller
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share product</span>
              </Button>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          <div className="flex items-center mt-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product?.reviews!.average)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {product?.reviews!.average} ({product?.reviews!.count} reviews)
            </span>
          </div>

          <div className="text-2xl font-bold mb-6">
            ${product.price.toFixed(2)}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={cn(
                      "h-10 px-4",
                      selectedSize === size &&
                        "bg-[#e6da46] text-black hover:bg-[#d6ca36]"
                    )}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Personalization</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full px-3 py-2 border rounded-md"
                    value={personalization.name}
                    onChange={(e) =>
                      setPersonalization((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    maxLength={12}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Number
                  </label>
                  <input
                    type="number"
                    placeholder="Enter number"
                    min="1"
                    max="99"
                    className="w-full px-3 py-2 border rounded-md"
                    value={personalization.number}
                    onChange={(e) =>
                      setPersonalization((prev) => ({
                        ...prev,
                        number: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                * Personalization costs an additional $10
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={decreaseQuantity}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div className="h-10 w-12 flex items-center justify-center border-y">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 bg-[#e6da46] text-black hover:bg-[#d6ca36]"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="secondary" className="flex-1">
                Buy Now
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          <Tabs defaultValue="description">
            <TabsList className="w-full">
              <TabsTrigger value="description" className="flex-1">
                Description
              </TabsTrigger>
              <TabsTrigger value="features" className="flex-1">
                Features
              </TabsTrigger>
              <TabsTrigger value="delivery" className="flex-1">
                Delivery
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="pt-4">
              <ul className="list-disc pl-5 space-y-1">
                {product?.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="delivery" className="pt-4">
              <p>
                Standard delivery: 3-5 working days (Free for orders over $50)
              </p>
              <p>Express delivery: 1-2 working days ($10)</p>
              <p>International shipping available to select countries.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter(
              (item) =>
                item.category === product.category && item.id !== product.id
            )
            .map((product) => (
              <ProductCard key={product.id} product={product as Product} />
            ))}
        </div>
      </div>
    </div>
  );
}
