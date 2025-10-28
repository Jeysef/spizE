import { A } from "@solidjs/router";
import HouseIcon from "lucide-solid/icons/house";
import ListIcon from "lucide-solid/icons/list";
import PlusIcon from "lucide-solid/icons/plus";
import ShoppingBasketIcon from "lucide-solid/icons/shopping-basket";
import { For } from "solid-js";
import { NavActions } from "~/components/NavBottom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import type { RoutePath } from "~/routes";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HouseIcon,
    },
    {
      title: "Items",
      url: "/items",
      icon: ListIcon,
    },
    {
      title: "Shopping",
      url: "/shopping",
      icon: ShoppingBasketIcon,
    },
  ],
  navActions: [
    {
      title: "Add Item",
      url: "/items/add",
      icon: PlusIcon,
    },
  ],
} satisfies Record<string, { title: string; url: RoutePath; icon: any }[]>;

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              // as={A}
              as={A}
              href="/"
              class="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {/* <IconInnerShadowTop className="!size-5" /> */}
              <span class="text-base font-semibold">Spíž-E</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <For each={data.navMain}>
                {(item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton as={A} href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavActions items={data.navActions} class="mt-auto mb-8" />
      </SidebarContent>
    </Sidebar>
  );
}
