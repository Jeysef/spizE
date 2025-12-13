import { A, useLocation } from "@solidjs/router";
import { HouseIcon, PackageOpenIcon, ShoppingBasketIcon } from "lucide-solid";
import { For } from "solid-js";
import { cn } from "~/lib/utils";

const links = [
  { href: "/", label: "Spíž", icon: HouseIcon },
  { href: "/low-stock", label: "Nízké množství", icon: PackageOpenIcon },
  // { href: "/items", label: "Items", icon: ListIcon },
  { href: "/shopping", label: "Nákupní seznam", icon: ShoppingBasketIcon },
];

export const BottomNavigation = () => {
  const location = useLocation();

  return (
    <div class="md:hidden fixed bottom-0 left-0 z-50 w-full bg-background/80 backdrop-blur-xl border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-4 pt-2">
      <div id="bottom-navigation-top" />
      <nav class="flex items-center justify-around px-2">
        <For each={links}>
          {(link) => {
            const isActive = () =>
              link.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.href);

            return (
              <A
                href={link.href}
                class={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-2xl px-5 py-2 transition-all duration-300 group select-none touch-manipulation active:scale-95",
                  isActive()
                    ? "bg-accent text-accent-foreground shadow-sm scale-105 font-medium"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                )}
              >
                <link.icon
                  class={cn("size-6 transition-transform duration-300", isActive() && "-translate-y-0.5")}
                  stroke-width={isActive() ? 2.5 : 2}
                />
                <span class="text-[10px] tracking-wide leading-none">{link.label}</span>
              </A>
            );
          }}
        </For>
      </nav>
    </div>
  );
};
