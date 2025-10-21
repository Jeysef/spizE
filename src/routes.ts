import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import ItemData from "~/pages/item.data";
import AboutData from "./pages/about.data";
import Home from "./pages/home";

export const routeNames = {
  "/": "Dashboard",
  "/about": "About",
  "/items": "Items",
  "/items/:id": "Add Item",
  "/items/add": "Add Item",
  "/shopping": "Shopping",
} as const;

export type RoutePath = keyof typeof routeNames;

export const routes: RouteDefinition<RoutePath | "**">[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/about")),
    preload: AboutData,
  },
  {
    path: "/items",
    component: lazy(() => import("./pages/items/ItemsPage")),
  },
  {
    path: "/items/add",
    component: lazy(() => import("./pages/ItemAdd")),
  },
  {
    path: "/items/:id",
    component: lazy(() => import("./pages/item/detail/ItemDetail.vm")),
    preload: ({ params }) => ItemData(params.id),
  },
  {
    path: "/shopping",
    component: lazy(() => import("./pages/shopping/ShoppingPage")),
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
] as const;

export function getRouteName(pathname: string) {
  return (
    Object.entries(routeNames).find(([path]) =>
      path.startsWith(pathname)
    )?.[1] ?? "Unknown"
  );
}
