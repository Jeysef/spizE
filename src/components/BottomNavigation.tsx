import { A } from "@solidjs/router";
import { HouseIcon, ListIcon, PackageOpenIcon, ShoppingBasketIcon } from "lucide-solid";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const links = [
  { href: "/", label: "Home", icon: HouseIcon },
  { href: "/missing", label: "Low Stock", icon: PackageOpenIcon },
  { href: "/items", label: "Pantry", icon: ListIcon },
  { href: "/shopping", label: "Shopping", icon: ShoppingBasketIcon },
];

export const BottomNavigation = () => {
  return (
    <div class="md:hidden fixed inset-0 pb-4 pt-2 top-auto flex justify-center background/95 backdrop-blur supports-backdrop-filter:bg-background/20">
      <div class="flex items-center gap-x-4 w-auto">
        {links.map((link) => (
          <A href={link.href} class={cn(buttonVariants({ variant: "outline" }), "bg-background flex-col h-auto gap-y-1")}>
            <link.icon />
            {link.label}
          </A>
        ))}
      </div>
    </div>
  );
};
