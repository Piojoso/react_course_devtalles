import { CustomHeader } from "@/components/custom/CustomHeader";

import { SearchControls } from "./ui/SearchControls";
import { HeroStats } from "@/heroes/components/HeroStats";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

const breadcrumbPath = [
  { label: "Home", url: "/" },
  { label: "Search", url: "/search" },
];

export const SearchPage = () => {
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
    </>
  );
};

export default SearchPage;
