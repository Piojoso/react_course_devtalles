import type { User } from ".";

export type Size = "L" | "M" | "S" | "XL" | "XS" | "XXL";

export type Tag = "hats" | "hoodie" | "shirt";

export type Gender = "kid" | "men" | "women" | "unisex";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: Tag[];
  images: string[];
  user: User;
}
