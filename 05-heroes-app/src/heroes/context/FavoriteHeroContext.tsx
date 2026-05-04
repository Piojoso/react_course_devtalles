import { createContext, useState, type PropsWithChildren } from "react";
import type { Hero } from "../interfaces/hero.interface";

interface FavoriteHeroContext {
  // State
  favorites: Hero[];
  favoriteCount: number;

  // Methods
  toggleFavorite: (hero: Hero) => void;
  isHeroFavorite: (hero: Hero) => boolean;
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>([]);

  const isHeroFavorite = (hero: Hero) => {
    return favorites.some((h) => h.id === hero.id);
  };

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find((h) => h.id === hero.id);

    if (heroExist) {
      setFavorites(favorites.filter((h) => h.id !== hero.id));
    } else {
      setFavorites([...favorites, hero]);
    }
  };

  return (
    <FavoriteHeroContext
      value={{
        // state
        favorites,
        favoriteCount: favorites.length,
        // methods
        isHeroFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
