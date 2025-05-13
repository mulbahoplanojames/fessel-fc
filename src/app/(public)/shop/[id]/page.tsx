import products from "@/data/products.json";
import SingleProductClient from "./single-product-client";
import { Product } from "@/types/product-type";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((product) => product.id === params.id);

  return <SingleProductClient product={product as Product} />;
}
