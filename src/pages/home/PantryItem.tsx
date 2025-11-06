import { createWritableMemo } from "@solid-primitives/memo";
import { A } from "@solidjs/router";
import CheckIcon from "lucide-solid/icons/check";
import ChevronRight from "lucide-solid/icons/chevron-right";
import PenIcon from "lucide-solid/icons/pencil";
import XIcon from "lucide-solid/icons/x";
import { type Component, createSignal, Show } from "solid-js";
import { buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { useItems } from "~/providers/items/items.hooks";

interface PantryItemProps {
  id: number;
  name: string;
  quantity: number;
  fullQuantity: number;
}

export const PantryItem: Component<PantryItemProps> = (props) => {
  const [isQuantityEditing, setQuantityEditing] = createSignal(false);
  const [quantity, setQuantity] = createWritableMemo(() => props.quantity);

  const collection = useItems();

  const updateQuantity = () => {
    collection().update(props.id, (prevItem) => {
      prevItem.current_quantity = quantity();
    });
  };
  return (
    <div class="flex justify-between w-full ">
      <div class="flex items-center gap-2">
        <A
          href={`/item/${props.id}`}
          class={cn(
            buttonVariants({ variant: "link" }),
            "text-foreground text-base"
          )}
        >
          <span>{props.name}</span>
          <ChevronRight class="size-4" />
        </A>
      </div>
      <div class="flex items-center gap-2">
        <Show
          when={isQuantityEditing()}
          fallback={
            <>
              <div>
                <PenIcon
                  class="size-4"
                  on:click={() => setQuantityEditing(true)}
                />
              </div>
              <span>{quantity()}</span>/<span>{props.fullQuantity}</span>
            </>
          }
        >
          <div class="hover:bg-accent p-0.5 rounded-md">
            <CheckIcon
              class="size-5"
              on:click={() => {
                setQuantityEditing(false);
                updateQuantity();
              }}
            />
          </div>
          <div class="hover:bg-accent p-0.5 rounded-md">
            <XIcon
              class="size-5"
              on:click={() => {
                setQuantity(props.quantity);
                setQuantityEditing(false);
              }}
            />
          </div>
          <Input
            type="number"
            required
            pattern="[0-9]*"
            min={0}
            value={quantity()}
            size={quantity().toString().split("").length + 1}
            onInput={(e) => {
              const value = Number(e.currentTarget.value);
              !isNaN(value) && setQuantity(value);
            }}
            class="invalid:border-red-500 invalid:text-red-600"
          />
          /<span>{props.fullQuantity}</span>
        </Show>
      </div>
    </div>
  );
};
