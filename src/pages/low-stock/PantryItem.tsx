import { A } from "@solidjs/router";
import ChevronRight from "lucide-solid/icons/chevron-right";
import type { Component } from "solid-js";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface PantryItemProps {
  id: number;
  name: string;
  quantity: number;
  modify_by: number;
  fullQuantity: number;
  unit_name: string;
}

export const PantryItem: Component<PantryItemProps> = (props) => {
  return (
    <div class="flex justify-between w-full items-center gap-4">
      <div class="flex items-center gap-2 min-w-0 overflow-hidden">
        <A
          href={`/item/${props.id}`}
          class={cn(
            buttonVariants({ variant: "link" }),
            "text-foreground text-base font-medium px-0 hover:no-underline hover:text-primary transition-colors truncate"
          )}
        >
          <span class="truncate">{props.name}</span>
          <ChevronRight class="size-4 shrink-0 text-muted-foreground ml-1" />
        </A>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <div class="flex items-center gap-1 text-lg font-bold tabular-nums">
          <span class="text-foreground">
            {props.quantity} {props.unit_name}
          </span>
          <span class="text-muted-foreground">/</span>
          <span class="text-muted-foreground">
            {props.fullQuantity} {props.unit_name}
          </span>
        </div>
      </div>
    </div>
  );
};

