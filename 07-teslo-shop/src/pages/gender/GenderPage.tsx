import { CustomPagination } from "@/components/custom/CustomPagination";
import { products } from "@/mocks/products.mock";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useParams } from "react-router";

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

  return (
    <>
      <CustomJumbotron title={`Productos para ${getGenderLabel(gender)}`} />

      <ProductsGrid products={products} />

      <CustomPagination totalPages={7} />
    </>
  );
};
