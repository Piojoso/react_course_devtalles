import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";

const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "heroes/:idSlug", element: <HeroPage /> },
      { path: "search", element: <SearchPage /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ path: "/admin", element: <AdminPage /> }],
  },

  { path: "*", element: <Navigate to="/" /> },
]);
