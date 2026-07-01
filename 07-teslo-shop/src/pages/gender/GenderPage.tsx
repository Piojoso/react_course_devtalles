import { useParams } from "react-router";

import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";

const getGenderLabel = (gender: string | undefined) => {
  switch (gender) {
    case "men":
      return "Hombres";
    case "women":
      return "Mujeres";
    case "kids":
      return "Niños";
    default:
      return "Todos";
  }
};

export const GenderPage = () => {
  const { gender } = useParams();

  const { data } = useProducts();

  return (
    <>
      <CustomJumbotron title={`Productos para ${getGenderLabel(gender)}`} />

      <ProductsGrid products={data?.products ?? []} />

      <CustomPagination totalPages={7} />
    </>
  );
};
