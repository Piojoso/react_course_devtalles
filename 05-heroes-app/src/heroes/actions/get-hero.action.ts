import { heroApi } from "../api/hero.api";
import type { Hero } from "../interfaces/hero.interface";

const HERO_URL = import.meta.env.VITE_API_URL;

interface Props {
  idSlug: string;
}

export const getHeroAction = async ({ idSlug }: Props) => {
  const { data: hero } = await heroApi.get<Hero>(`/${idSlug}`);

  return {
    ...hero,
    image: `${HERO_URL}/images/${hero.image}`,
  };
};
