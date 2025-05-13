import products from "@/data/products.json";
import SingleProductClient from "./single-product-client";
import { Product } from "@/types/product-type";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((product) => product.id === id);

  return <SingleProductClient product={product as Product} />;
}
