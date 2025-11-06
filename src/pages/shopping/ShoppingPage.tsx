import { For, Show } from "solid-js";
import type { ItemResponse } from "~/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ShoppingItemCard } from "~/pages/shopping/ShoppingCard";

interface ShoppingPageProps {
  lowStockItems: ItemResponse[];
  handleRefill: (itemId: number, quantity: number) => void;
  loading: boolean;
}

// The main component for the Shopping List page
export default function ShoppingPage(props: ShoppingPageProps) {
  return (
    <div class="container mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle class="text-3xl font-bold tracking-tight">
            Shopping List
          </CardTitle>
          <CardDescription>
            Here are the items you need to buy to restock your pantry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Show when={!props.loading} fallback={<p>Loading...</p>}>
            <div class="grid gap-3">
              <For
                each={props.lowStockItems}
                fallback={
                  <div class="rounded-lg border-2 border-dashed border-border p-8 text-center">
                    <h3 class="text-lg font-semibold">All Stocked Up!</h3>
                    <p class="text-muted-foreground">
                      Your pantry is full. There's nothing to buy.
                    </p>
                  </div>
                }
              >
                {(item) => (
                  <ShoppingItemCard item={item} onRefill={props.handleRefill} />
                )}
              </For>
            </div>
          </Show>
        </CardContent>
      </Card>
    </div>
  );
}
