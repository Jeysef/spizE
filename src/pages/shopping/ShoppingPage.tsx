import { For, Show } from "solid-js";
import type { ItemResponse, UnitResponse } from "~/client";
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
  allUnits: UnitResponse[];
}

// The main component for the Shopping List page
export default function ShoppingPage(props: ShoppingPageProps) {
  return (
    <div class="container mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle class="text-3xl font-bold tracking-tight">
            Nákupní seznam
          </CardTitle>
          <CardDescription class="text-muted-foreground">
            Položky, které je třeba koupit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Show when={!props.loading} fallback={<p>Načítání...</p>}>
            <div class="grid gap-3">
              <For
                each={props.lowStockItems}
                fallback={
                  <div class="rounded-lg border-2 border-dashed border-border p-8 text-center">
                    <h3 class="text-lg font-semibold">Všechno je na skladněno!</h3>
                    <p class="text-muted-foreground">
                      Vaše spíže je zplněna. Není co koupit.
                    </p>
                  </div>
                }
              >
                {(item) => (
                  <ShoppingItemCard item={item} onRefill={props.handleRefill} allUnits={props.allUnits} />
                )}
              </For>
            </div>
          </Show>
        </CardContent>
      </Card>
    </div>
  );
}
