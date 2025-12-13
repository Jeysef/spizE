import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import ItemData from "~/pages/item.data";
import AboutData from "./pages/about.data";
// import Home from "./pages/home/home.vm";
import ItemsPage from "./pages/items";

export const routeNames = {
  "/": "Dashboard",
  "/about": "About",
  "/items": "Items",
  "/item/:id": "Add Item",
  "/items/add": "Add Item",
  "/shopping": "Shopping",
  "/low-stock": "Low Stock",
} as const;

export type RoutePath = keyof typeof routeNames;

export const routes: RouteDefinition<RoutePath | "**">[] = [
  {
    path: "/",
    component: ItemsPage,
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/about")),
    preload: AboutData,
  },
  {
    path: "/items",
    component: lazy(() => import("./pages/items")),
  },
  {
    path: "/items/add",
    component: lazy(() => import("./pages/item/new")),
  },
  {
    path: "/low-stock",
    component: lazy(() => import("./pages/low-stock/low-stock.vm")),
  },
  {
    path: "/item/:id",
    component: lazy(() => import("./pages/item/detail")),
    preload: ({ params }) => ItemData(params.id),
  },
  {
    path: "/shopping",
    component: lazy(() => import("./pages/shopping")),
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
