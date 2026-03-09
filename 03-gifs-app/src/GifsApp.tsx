import { CustomHeader } from "./common/components/CustomHeader";
import { SearchBar } from "./common/components/SearchBar";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";

export const GifsApp = () => {
  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de gifs"
        subtitle="Descubre y comparte el gif perfecto"
      />

      {/* Search */}
      <SearchBar placeholder="Buscar gifs" />

      {/* Busquedas previas */}
      <PreviousSearches />

      {/* Gifs */}
      <GifList gifs={mockGifs} />
    </>
  );
};
