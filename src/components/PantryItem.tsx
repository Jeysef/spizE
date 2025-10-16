import { A } from "@solidjs/router";
import PenIcon from "lucide-solid/icons/pen";
import type { Component } from "solid-js";

interface PantryItemProps {
  id: string;
  name: string;
  quantity: string;
}

export const PantryItem: Component<PantryItemProps> = (props) => {
  return (
    <div class="flex justify-between w-full ">
      <div class="flex items-center gap-2">
        <span>{props.name}</span>
        <A href={`/items/${props.id}`}>
          <PenIcon class="size-4" />
        </A>
      </div>
      <span>{props.quantity}</span>
    </div>
  );
};
