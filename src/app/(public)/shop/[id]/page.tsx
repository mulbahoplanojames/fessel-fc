import { notFound } from "next/navigation";
import SingleProductClient from "./single-product-client";
import { getProductById } from "@/lib/actions/products";
import { Suspense } from "react";
import ProductLoading from "./loading";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const product = await getProductById(id);
  
  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductLoading />}>
      <SingleProductClient product={product} />
    </Suspense>
  );
}
