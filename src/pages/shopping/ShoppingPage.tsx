import { For, Show, createSignal, createMemo } from "solid-js";
import type { CategoryResponse, ItemResponse, UnitResponse } from "~/client";
import { Badge } from "~/components/ui/badge";
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
  allCategories: CategoryResponse[] | undefined;
}


// The main component for the Shopping List page
export default function ShoppingPage(props: ShoppingPageProps) {
  const [selectedCategoryId, setSelectedCategoryId] = createSignal<number | null>(null);

  const relevantCategories = createMemo(() => {
    if (!props.lowStockItems || !props.allCategories) return [];

    const usedCategoryIds = new Set(props.lowStockItems.map(item => item.category_id));
    return props.allCategories.filter(cat => usedCategoryIds.has(cat.id));
  });

  const filteredItems = createMemo(() => {
    if (selectedCategoryId() === null) return props.lowStockItems;
    return props.lowStockItems.filter(item => item.category_id === selectedCategoryId());
  });

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

          <div class="w-full overflow-x-auto pb-2 scrollbar-hide pt-4 flex">
            <div class="flex gap-2 min-w-0 pr-2 w-0">
              <For each={relevantCategories()}>
                {(category) => (
                  <Badge
                    variant={selectedCategoryId() === category.id ? "default" : "secondary"}
                    class="cursor-pointer whitespace-nowrap px-3 py-1 text-sm bg-accent text-accent-foreground hover:bg-accent/80 data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground select-none transition-all duration-200"
                    onClick={() => setSelectedCategoryId(prev => prev === category.id ? null : category.id)}
                    data-selected={selectedCategoryId() === category.id}
                  >
                    {category.name}
                  </Badge>
                )}
              </For>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Show when={!props.loading} fallback={<p>Načítání...</p>}>
            <div class="grid gap-3">
              <For
                each={filteredItems()}
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
