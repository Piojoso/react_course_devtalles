import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";

const activeLinkClass: string = "bg-slate-200 rounded-md";

export const CustomMenu = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Menu */}
        <NavigationMenuItem className={cn(isActive("/") && activeLinkClass)}>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Home
          </Link>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem
          className={cn(isActive("/search") && activeLinkClass)}
        >
          <Link to="/search" className={navigationMenuTriggerStyle()}>
            Search
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
