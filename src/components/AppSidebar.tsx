import { A } from "@solidjs/router";
import HouseIcon from "lucide-solid/icons/house";
import InfoIcon from "lucide-solid/icons/info";
import PackageOpenIcon from "lucide-solid/icons/package-open";
import PlusIcon from "lucide-solid/icons/plus";
import ShoppingCartIcon from "lucide-solid/icons/shopping-cart";
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
  useSidebar,
} from "~/components/ui/sidebar";
import type { RoutePath } from "~/routes";

const data = {
  navMain: [
    {
      title: "Spíž",
      url: "/",
      icon: HouseIcon,
    },
    {
      title: "Nízké množství",
      url: "/low-stock",
      icon: PackageOpenIcon,
    },
    {
      title: "Nákupní seznam",
      url: "/shopping",
      icon: ShoppingCartIcon,
    },
    {
      title: "O aplikaci",
      url: "/about",
      icon: InfoIcon,
    },
  ],
  navActions: [
    {
      title: "Přidat položku",
      url: "/items/add",
      icon: PlusIcon,
    },
  ],
} satisfies Record<string, { title: string; url: RoutePath; icon: any }[]>;

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              // as={A}
              as={A}
              href="/"
              class="data-[slot=sidebar-menu-button]:p-1.5!"
              onClick={() => isMobile() && setOpenMobile(false)}
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
                    <SidebarMenuButton
                      as={A}
                      href={item.url}
                      onClick={() => isMobile() && setOpenMobile(false)}
                    >
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
