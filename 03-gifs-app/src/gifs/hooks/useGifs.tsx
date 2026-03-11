import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query";

type CachedGif = Record<string, Gif[]>;

// const gifCache: CachedGif = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  const gifCache = useRef<CachedGif>({});

  const loadFromCache = (term: string): boolean => {
    if (gifCache.current[term]) {
      setGifs(gifCache.current[term]);

      return true;
    }

    return false;
  };

  const handlePreviousSerchesClick = async (searchedTerm: string) => {
    if (loadFromCache(searchedTerm)) return;

    const gifs = await getGifsByQuery(searchedTerm);

    setGifs(gifs);
  };

  const handleSearch = async (searchedTerm: string) => {
    searchedTerm = searchedTerm.trim().toLowerCase();

    if (searchedTerm === "") return;
    if (loadFromCache(searchedTerm)) return;

    if (!previousSearches.includes(searchedTerm)) {
      setPreviousSearches([searchedTerm, ...previousSearches].splice(0, 5));
    }

    const gifs = await getGifsByQuery(searchedTerm);

    setGifs(gifs);

    gifCache.current[searchedTerm] = gifs;
  };

  const handleGetGifUrl = (url: string): string => {
    navigator.clipboard.writeText(url);

    return "Copied!";
  };

  return {
    gifs,
    previousSearches,

    handlePreviousSerchesClick,
    handleSearch,
    handleGetGifUrl,
  };
};
