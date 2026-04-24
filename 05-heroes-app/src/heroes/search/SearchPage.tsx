import { CustomHeader } from "@/components/custom/CustomHeader";
import { HeroStats } from "../components/HeroStats";

export const SearchPage = () => {
  return (
    <>
      <CustomHeader
        title="Search superheroes"
        subtitle="Search superheroes or villians"
      />

      <HeroStats />
    </>
  );
};

export default SearchPage;
