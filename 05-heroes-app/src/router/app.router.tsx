import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HomePage } from "@/heroes/home/HomePage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/heroes/pages/HeroPage";
import { SearchPage } from "@/heroes/search/SearchPage";
import { createBrowserRouter } from "react-router";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "heroes/1", element: <HeroPage /> },
      { path: "search", element: <SearchPage /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ path: "/admin", element: <AdminPage /> }],
  },
]);
