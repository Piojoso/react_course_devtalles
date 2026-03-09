import { CustomHeader } from "./common/components/CustomHeader";
import { SearchBar } from "./common/components/SearchBar";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const {
    gifs,
    previousSearches,
    handleSearch,
    handlePreviousSerchesClick,
    handleGetGifUrl,
  } = useGifs();

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
      <GifList gifs={gifs} onGetGifUrl={handleGetGifUrl} />
    </>
  );
};
