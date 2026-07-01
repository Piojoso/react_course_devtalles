import type { Product } from ".";

export interface ProductsResponse {
  count: number;
  pages: number;
  products: Product[];
}
