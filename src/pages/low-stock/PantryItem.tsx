import { createWritableMemo } from "@solid-primitives/memo";
import { A } from "@solidjs/router";
import CheckIcon from "lucide-solid/icons/check";
import ChevronRight from "lucide-solid/icons/chevron-right";
import MinusIcon from "lucide-solid/icons/minus";
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

  const decreaseQuantity = () => {
    if (quantity() <= 0) return;
    const newQuantity = quantity() - 1;
    setQuantity(newQuantity);
    // Directly update without entering edit mode
    collection().update(props.id, (prevItem) => {
      prevItem.current_quantity = newQuantity;
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
              {/* Conditionally show Minus or Pen icon based on quantity */}
              <Show
                when={quantity() > 0}
                fallback={
                  <div class="hover:bg-accent p-0.5 rounded-md cursor-pointer">
                    <PenIcon
                      class="size-4"
                      on:click={() => setQuantityEditing(true)}
                    />
                  </div>
                }
              >
                <div class="hover:bg-accent p-0.5 rounded-md cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
                  <MinusIcon class="size-4" on:click={decreaseQuantity} />
                </div>
              </Show>
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
            size={quantity().toString().length + 1}
            onInput={(e) => {
              const value = Number(e.currentTarget.value);
              if (!isNaN(value)) {
                setQuantity(value);
              }
            }}
            class="invalid:border-red-500 invalid:text-red-600"
          />
          /<span>{props.fullQuantity}</span>
        </Show>
      </div>
    </div>
  );
};
