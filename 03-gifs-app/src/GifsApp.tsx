import { useState } from "react";
import { CustomHeader } from "./common/components/CustomHeader";
import { SearchBar } from "./common/components/SearchBar";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";

export const GifsApp = () => {
  const [previousSearches, setPreviousSearches] = useState([
    "hollow knight",
    "factorio",
    "marvel rivals",
  ]);

  const handlePreviousSerchesClick = (searchedTerm: string) => {
    console.log({ searchedTerm });
  };

  const handleSearch = (searchedTerm: string) => {
    searchedTerm = searchedTerm.trim().toLowerCase();

    if (searchedTerm === "") return;
    if (previousSearches.includes(searchedTerm)) return;

    setPreviousSearches([searchedTerm, ...previousSearches].splice(0, 5));
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
      <GifList gifs={mockGifs} />
    </>
  );
};
