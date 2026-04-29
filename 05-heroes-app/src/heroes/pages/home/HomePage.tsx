import { useMemo } from "react";
import { useSearchParams } from "react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomHeader } from "@/components/custom/CustomHeader";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { HeroesGrid } from "@/heroes/components/HeroGrid";
import { HeroStats } from "@/heroes/components/HeroStats";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

import { useHeroesSummary } from "@/heroes/hooks/useHeroesSummary";
import { usePaginatedHeroes } from "@/heroes/hooks/usePaginatedHeroes";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "all";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  const { data: heroesResponse, isLoading: isHeroesLoading } =
    usePaginatedHeroes();

  const { data: summary } = useHeroesSummary();

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Superhero Universe"
        subtitle="Discover, explore, and manage your favorite superheroes and villains"
      />

      <CustomBreadcrumbs steps={[{ label: "Home", url: "/" }]} />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Tabs */}
      <Tabs value={selectedTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="all"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "all");
                return prev;
              })
            }
          >
            All Characters ({summary?.totalHeroes})
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "favorites");
                return prev;
              })
            }
            className="flex items-center gap-2"
          >
            Favorites (3)
          </TabsTrigger>
          <TabsTrigger
            value="heroes"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "heroes");
                return prev;
              })
            }
          >
            Heroes ({summary?.heroCount})
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "villains");
                return prev;
              })
            }
          >
            Villains ({summary?.villainCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <h1>All</h1>
          {!isHeroesLoading && (
            <HeroesGrid heroes={heroesResponse?.heroes ?? []} />
          )}
        </TabsContent>
        <TabsContent value="favorites">
          <h1>Favorites</h1>
          {!isHeroesLoading && (
            <HeroesGrid heroes={heroesResponse?.heroes ?? []} />
          )}
        </TabsContent>
        <TabsContent value="heroes">
          <h1>Heroes</h1>
          {!isHeroesLoading && (
            <HeroesGrid heroes={heroesResponse?.heroes ?? []} />
          )}
        </TabsContent>
        <TabsContent value="villains">
          <h1>Villains</h1>
          {!isHeroesLoading && (
            <HeroesGrid heroes={heroesResponse?.heroes ?? []} />
          )}
        </TabsContent>
      </Tabs>

      <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
    </>
  );
};
