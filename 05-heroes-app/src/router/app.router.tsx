import { AdminPage } from "@/admin/pages/AdminPage";
import { HomePage } from "@/heroes/home/HomePage";
import { HeroPage } from "@/heroes/pages/HeroPage";
import { SearchPage } from "@/heroes/search/SearchPage";
import { createBrowserRouter } from "react-router";

export const appRouter = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/heroes/1", element: <HeroPage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/admin", element: <AdminPage /> },
]);
