import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";
import { useSearchParams } from "react-router";

export const usePaginatedHeroes = () => {
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page") || "1";
  const limitParam = searchParams.get("limit") || "6";

  return useQuery({
    queryKey: ["heores", { page: pageParam, limit: limitParam }],
    queryFn: () => getHeroesByPageAction(+pageParam, +limitParam),
    staleTime: 1000 * 60 * 5,
  });
};
