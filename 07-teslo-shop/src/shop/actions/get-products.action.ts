import { tesloApi } from "@/api/teslo-api";
import type { ProductsResponse } from "@/interfaces";

const backURL = import.meta.env.VITE_BACK_API_URL;

export const getProductsAction = async (): Promise<ProductsResponse> => {
  const { data } = await tesloApi.get<ProductsResponse>("/products");

  const productsWithImageUrl = data.products.map((product) => ({
    ...product,
    images: product.images.map((image) => `${backURL}/files/product/${image}`),
  }));

  return { ...data, products: productsWithImageUrl };
};
