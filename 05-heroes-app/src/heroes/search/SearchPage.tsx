import { CustomHeader } from "@/components/custom/CustomHeader";
import { HeroStats } from "../components/HeroStats";
import { SearchControls } from "./ui/SearchControls";

export const SearchPage = () => {
  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Search superheroes"
        subtitle="Search superheroes or villians"
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Controls */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
