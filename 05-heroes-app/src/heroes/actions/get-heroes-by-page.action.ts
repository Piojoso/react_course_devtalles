import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../interfaces/get-heroes.response";

const HERO_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (): Promise<HeroesResponse> => {
  const { data } = await heroApi.get<HeroesResponse>("/");

  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${HERO_URL}/images/${hero.image}`,
  }));

  return {
    ...data,
    heroes,
  };
};
