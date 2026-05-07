import { heroApi } from "../api/hero.api";
import type { Hero } from "../interfaces/hero.interface";

interface Options {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

const HERO_URL = import.meta.env.VITE_API_URL;

export const searchHeroesAction = async ({
  name,
  team,
  category,
  universe,
  status,
  strength,
}: Options): Promise<Hero[]> => {
  if (!name && team && category && universe && status && strength) {
    return [];
  }

  const { data: heroes } = await heroApi.get<Hero[]>("/search", {
    params: { name, team, category, universe, status, strength },
  });

  return heroes.map((hero) => ({
    ...hero,
    image: `${HERO_URL}/images/${hero.image}`,
  }));
};
