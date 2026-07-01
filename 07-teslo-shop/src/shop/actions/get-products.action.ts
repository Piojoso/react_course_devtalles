import { tesloApi } from "@/api/teslo-api";
import type { ProductsResponse } from "@/interfaces";

export const getProductsAction = async () => {
  const { data } = await tesloApi.get<ProductsResponse>("/products");

  return data;
};
