import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";
import { useSearchParams } from "react-router";
import { useMemo } from "react";

export const usePaginatedHeroes = () => {
  const [searchParams] = useSearchParams();

  const tabParam = searchParams.get("tab") || "all";
  const pageParam = searchParams.get("page") || "1";
  const limitParam = searchParams.get("limit") || "6";

  const category = useMemo(() => {
    switch (tabParam) {
      case "heroes":
        return "hero";
      case "villains":
        return "villain";
      default:
        return "all";
    }
  }, [tabParam]);

  return useQuery({
    queryKey: ["heores", { page: pageParam, limit: limitParam, category }],
    queryFn: () => getHeroesByPageAction(+pageParam, +limitParam, category),
    staleTime: 1000 * 60 * 5,
  });
};
