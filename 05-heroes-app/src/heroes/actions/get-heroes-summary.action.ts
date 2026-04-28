import { heroApi } from "../api/hero.api";
import type { SummaryResponse } from "../interfaces/get-heroes-summary.response";

export const getHeroesSummaryAction = async () => {
  const { data } = await heroApi.get<SummaryResponse>("/summary");

  return data;
};
