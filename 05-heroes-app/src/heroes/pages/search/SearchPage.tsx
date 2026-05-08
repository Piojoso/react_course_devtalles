import { CustomHeader } from "@/components/custom/CustomHeader";

import { SearchControls } from "./ui/SearchControls";
import { HeroStats } from "@/heroes/components/HeroStats";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { HeroesGrid } from "@/heroes/components/HeroGrid";

const breadcrumbPath = [
  { label: "Home", url: "/" },
  { label: "Search", url: "/search" },
];

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const nameParam = searchParams.get("name") ?? "";
  const strengthParam = searchParams.get("min-strength") ?? "";

  const { data: searchHeroesResult = [], isLoading } = useQuery({
    queryKey: ["searchResponse", { name: nameParam, strength: strengthParam }],
    queryFn: () =>
      searchHeroesAction({ name: nameParam, strength: strengthParam }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Search superheroes"
        subtitle="Search superheroes or villians"
      />

      <CustomBreadcrumbs steps={breadcrumbPath} />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Controls */}
      <SearchControls />

      <HeroesGrid heroes={searchHeroesResult} />
    </>
  );
};

export default SearchPage;
