import { use, useMemo } from "react";
import { useSearchParams } from "react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomHeader } from "@/components/custom/CustomHeader";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { HeroesGrid } from "@/heroes/components/HeroGrid";
import { HeroStats } from "@/heroes/components/HeroStats";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

import { useHeroesSummary } from "@/heroes/hooks/useHeroesSummary";
import { usePaginatedHeroes } from "@/heroes/hooks/usePaginatedHeroes";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

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
  const { favorites: favoritesHeroes, favoriteCount: favoriteHeroesCount } =
    use(FavoriteHeroContext);

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
                prev.set("page", "1");
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
                prev.set("page", "1");

                return prev;
              })
            }
            className="flex items-center gap-2"
          >
            Favorites ({favoriteHeroesCount})
          </TabsTrigger>
          <TabsTrigger
            value="heroes"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "heroes");
                prev.set("page", "1");

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
                prev.set("page", "1");

                return prev;
              })
            }
          >
            Villains ({summary?.villainCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {!isHeroesLoading && (
            <HeroesGrid heroes={heroesResponse?.heroes ?? []} />
          )}
        </TabsContent>
        <TabsContent value="favorites">
          {!isHeroesLoading && <HeroesGrid heroes={favoritesHeroes} />}
        </TabsContent>
        <TabsContent value="heroes">
          {!isHeroesLoading && (
            <HeroesGrid heroes={heroesResponse?.heroes ?? []} />
          )}
        </TabsContent>
        <TabsContent value="villains">
          {!isHeroesLoading && (
            <HeroesGrid heroes={heroesResponse?.heroes ?? []} />
          )}
        </TabsContent>
      </Tabs>

      {selectedTab !== "favorites" && (
        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      )}
    </>
  );
};
