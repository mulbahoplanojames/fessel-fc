export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  sizes?: string[];
  images?: string[];
  reviews?: {
    average: number;
    count: number;
  };
  description: string;
  features?: string[];
}
