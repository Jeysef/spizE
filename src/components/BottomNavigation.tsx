import { A } from "@solidjs/router";
import { buttonVariants } from "~/components/ui/button";

export const BottomNavigation = () => {
  return (
    <div class="md:hidden sticky inset-0 pb-6 pt-2 top-auto flex justify-center background/95 backdrop-blur supports-[backdrop-filter]:bg-background/20">
      <div class="flex items-center gap-x-6 w-auto">
        <A href="/shopping" class={buttonVariants()}>
          Shopping
        </A>
        <A
          href="/items"
          class={buttonVariants({ variant: "outline", class: "bg-background" })}
        >
          Edit pantry
        </A>
      </div>
    </div>
  );
};
