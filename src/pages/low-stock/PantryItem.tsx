import { createWritableMemo } from "@solid-primitives/memo";
import { A } from "@solidjs/router";
import CheckIcon from "lucide-solid/icons/check";
import ChevronRight from "lucide-solid/icons/chevron-right";
import MinusIcon from "lucide-solid/icons/minus";
import PenIcon from "lucide-solid/icons/pencil";
import XIcon from "lucide-solid/icons/x";
import { type Component, createSignal, Show } from "solid-js";
import { Button, buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { useItems } from "~/providers/items/items.hooks";

interface PantryItemProps {
  id: number;
  name: string;
  quantity: number;
  modify_by: number;
  fullQuantity: number;
  unit_name: string;
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
        <Show
          when={isQuantityEditing()}
          fallback={
            <>
              {/* Conditionally show Minus or Pen icon based on quantity */}
              <Show
                when={quantity() > 0}
                fallback={
                  <Button
                    variant="ghost"
                    size="icon"
                    class="size-8 rounded-full text-muted-foreground hover:text-foreground"
                    onClick={() => setQuantityEditing(true)}
                  >
                    <PenIcon class="size-4" />
                    <span class="sr-only">Upravit</span>
                  </Button>
                }
              >
                <Button
                  variant="secondary"
                  size="sm"
                  class="h-8 min-w-8 px-3 rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium border-0"
                  onClick={decreaseQuantity}
                >
                  {`- ${props.modify_by ?? 1} ${props.unit_name}`}
                  <span class="sr-only">Odebrat 1</span>
                </Button>
              </Show>
              <div class="flex items-center gap-1 text-sm font-medium tabular-nums">
                <span class="text-foreground">{quantity()}</span>
                <span class="text-muted-foreground">/</span>
                <span class="text-muted-foreground">{props.fullQuantity}</span>
              </div>
            </>
          }
        >
          <Button
            variant="ghost"
            size="icon"
            class="size-8 rounded-full text-green-600 hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/50"
            onClick={() => {
              setQuantityEditing(false);
              updateQuantity();
            }}
          >
            <CheckIcon class="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            class="size-8 rounded-full text-muted-foreground hover:text-foreground"
            onClick={() => {
              setQuantity(props.quantity);
              setQuantityEditing(false);
            }}
          >
            <XIcon class="size-4" />
          </Button>
          <div class="flex items-center gap-2">
            <Input
              type="number"
              required
              pattern="[0-9]*"
              min={0}
              value={quantity()}
              // size={quantity().toString().length + 1}
              onInput={(e) => {
                const value = Number(e.currentTarget.value);
                if (!isNaN(value)) {
                  setQuantity(value);
                }
              }}
              class="w-16 h-8 text-center px-1"
            />
            <span class="text-sm text-muted-foreground">/ {props.fullQuantity}</span>
          </div>
        </Show>
      </div>
    </div>
  );
};
