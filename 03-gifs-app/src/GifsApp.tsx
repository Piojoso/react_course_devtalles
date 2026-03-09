import { useState } from "react";

import { CustomHeader } from "./common/components/CustomHeader";
import { SearchBar } from "./common/components/SearchBar";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";

import type { Gif } from "./gifs/interfaces/gif.interface";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query";

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);

  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  const handlePreviousSerchesClick = (searchedTerm: string) => {
    console.log({ searchedTerm });
  };

  const handleSearch = async (searchedTerm: string) => {
    searchedTerm = searchedTerm.trim().toLowerCase();

    if (searchedTerm === "") return;
    if (previousSearches.includes(searchedTerm)) return;

    setPreviousSearches([searchedTerm, ...previousSearches].splice(0, 5));

    const gifs = await getGifsByQuery(searchedTerm);

    setGifs(gifs);
  };

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de gifs"
        subtitle="Descubre y comparte el gif perfecto"
      />

      {/* Search */}
      <SearchBar placeholder="Buscar gifs" onSearch={handleSearch} />

      {/* Busquedas previas */}
      <PreviousSearches
        searches={previousSearches}
        onLabelClicked={handlePreviousSerchesClick}
      />

      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  );
};
