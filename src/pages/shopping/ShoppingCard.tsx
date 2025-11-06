import { createWritableMemo } from "@solid-primitives/memo";
import { A } from "@solidjs/router";
import { Check, CheckIcon, ChevronRight, PenIcon, XIcon } from "lucide-solid";
import { createSignal, Show } from "solid-js";
import type { ItemResponse } from "~/client";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

interface ShoppingItemCardProps {
  item: ItemResponse;
  onRefill: (itemId: number, quantity: number) => void;
}

export function ShoppingItemCard(props: ShoppingItemCardProps) {
  // Calculate how many units of the item are needed

  const defaultQuantityToBuy = () =>
    props.item.full_quantity - props.item.current_quantity;

  const [quantityToBuy, setQuantityToBuy] =
    createWritableMemo(defaultQuantityToBuy);
  const [editedQuantityToBuy, setEditedQuantityToBuy] =
    createWritableMemo(quantityToBuy);
  const [isQuantityEditing, setQuantityEditing] = createSignal(false);

  const isChanged = () => quantityToBuy() !== defaultQuantityToBuy();

  const updateQuantity = () => {
    props.onRefill(props.item.id, quantityToBuy());
  };

  return (
    <Card>
      <CardHeader class="pb-2">
        <CardTitle>
          <A
            href={`/item/${props.item.id}`}
            class={"underline-offset-4 hover:underline flex items-center gap-2"}
          >
            {props.item.name} <ChevronRight class="size-4" />
          </A>
        </CardTitle>
      </CardHeader>
      <CardContent class="flex justify-between gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-muted-foreground">Buying:&nbsp;</span>
          <div class="flex items-center gap-2 flex-wrap">
            <Show
              when={isQuantityEditing()}
              fallback={
                <>
                  <div class="flex items-center gap-2">
                    <span class="font-medium text-foreground">
                      {editedQuantityToBuy()}
                    </span>
                    <PenIcon
                      class="size-4 text-muted-foreground"
                      on:click={() => setQuantityEditing(true)}
                    />
                  </div>
                  <Show when={isChanged()}>
                    <div class="flex items-center">
                      <span class="font-medium text-foreground">
                        out of missing &nbsp;
                      </span>
                      <span class="font-medium text-foreground">
                        {defaultQuantityToBuy()}
                      </span>
                    </div>
                  </Show>
                </>
              }
            >
              <div class="flex items-center gap-2">
                <div class="hover:bg-accent p-0.5 rounded-md">
                  <CheckIcon
                    class="size-5"
                    on:click={() => {
                      setQuantityToBuy(editedQuantityToBuy());
                      setQuantityEditing(false);
                    }}
                  />
                </div>
                <div class="hover:bg-accent p-0.5 rounded-md">
                  <XIcon
                    class="size-5"
                    on:click={() => {
                      setEditedQuantityToBuy(quantityToBuy());
                      setQuantityEditing(false);
                    }}
                  />
                </div>
                <Input
                  type="number"
                  required
                  pattern="[0-9]*"
                  min={0}
                  value={editedQuantityToBuy()}
                  size={editedQuantityToBuy().toString().split("").length + 1}
                  onInput={(e) => {
                    const value = Number(e.currentTarget.value);
                    !isNaN(value) && setEditedQuantityToBuy(value);
                  }}
                  class="invalid:border-red-500 invalid:text-red-600"
                />
              </div>
            </Show>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={() => updateQuantity()}>
          <Check class="h-4 w-4" />
          <span class="sr-only">Mark as done</span>
        </Button>
      </CardContent>
    </Card>
  );
}
