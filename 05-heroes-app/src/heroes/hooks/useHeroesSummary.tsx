import { useQuery } from "@tanstack/react-query";
import { getHeroesSummaryAction } from "../actions/get-heroes-summary.action";

export const useHeroesSummary = () => {
  return useQuery({
    queryKey: ["summary-information"],
    queryFn: getHeroesSummaryAction,
    staleTime: 1000 * 60 * 5,
  });
};
