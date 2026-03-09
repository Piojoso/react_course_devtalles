import { useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query";

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);

  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  const handlePreviousSerchesClick = async (searchedTerm: string) => {
    const gifs = await getGifsByQuery(searchedTerm);

    setGifs(gifs);
  };

  const handleSearch = async (searchedTerm: string) => {
    searchedTerm = searchedTerm.trim().toLowerCase();

    if (searchedTerm === "") return;
    if (previousSearches.includes(searchedTerm)) return;

    setPreviousSearches([searchedTerm, ...previousSearches].splice(0, 5));

    const gifs = await getGifsByQuery(searchedTerm);

    setGifs(gifs);
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
