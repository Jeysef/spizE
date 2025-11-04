import { A } from "@solidjs/router";
import { useLiveQuery } from "@tanstack/solid-db";
import { createMemo, createSignal, For, Show } from "solid-js";
import type { ItemResponse } from "~/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { createItemsCollectionOptions } from "~/db/collections";
import { useUser } from "~/providers/user/user.hooks";

// Reusable component for displaying a single item in the list
function ItemCard(props: { item: ItemResponse }) {
  const progress = () => {
    if (props.item.full_quantity === 0) return 100; // Fully stocked if target is 0
    return (props.item.current_quantity / props.item.full_quantity) * 100;
  };

  return (
    <Card class="flex flex-col justify-between transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle>{props.item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-2 text-center">
          <Label>Stock Level</Label>
          <Progress value={progress()} />
          <p class="text-sm font-medium text-muted-foreground">{`${props.item.current_quantity} / ${props.item.full_quantity}`}</p>
        </div>
      </CardContent>
      <CardFooter>
        <A
          href={`/item/${props.item.id}`}
          class="w-full rounded-md bg-primary p-2 text-center text-sm font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary/90"
        >
          View Details
        </A>
      </CardFooter>
    </Card>
  );
}

// The main component for the Items page
export default function ItemsPage() {
  const [nameFilter, setNameFilter] = createSignal("");
  const [sortBy, setSortBy] = createSignal("missing");

  const [user] = useUser();

  const itemsQuery = useLiveQuery((q) =>
    q.from({ users: createItemsCollectionOptions(() => user().id) })
  );

  const filteredAndSortedItems = createMemo(() => {
    const items = itemsQuery.data;
    const filteredItems = items?.filter((item) =>
      item.name.toLowerCase().includes(nameFilter().toLowerCase())
    );

    switch (sortBy()) {
      case "name":
        filteredItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "stock":
        filteredItems.sort(
          (a, b) =>
            a.current_quantity / a.full_quantity -
            b.current_quantity / b.full_quantity
        );
        break;
      case "missing":
      default:
        filteredItems.sort((a, b) => {
          // Primary sort: items with 0 quantity first
          if (a.current_quantity === 0 && b.current_quantity > 0) return -1;
          if (b.current_quantity === 0 && a.current_quantity > 0) return 1;

          // Secondary sort: largest deficit (full_quantity - quantity)
          const deficitA = a.full_quantity - a.current_quantity;
          const deficitB = b.full_quantity - b.current_quantity;
          return deficitB - deficitA;
        });
        break;
    }

    return filteredItems;
  });

  return (
    <main class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold tracking-tight">Pantry Items</h1>
        <p class="text-muted-foreground">
          Browse and manage all items in your pantry.
        </p>
      </div>

      {/* Filter and Sort Controls */}
      <div class="mb-6 flex flex-col gap-4 sm:flex-row">
        <div class="grow">
          <Input
            disabled={itemsQuery.isLoading()}
            placeholder="Filter items by name..."
            value={nameFilter()}
            onInput={(e) => setNameFilter(e.currentTarget.value)}
          />
        </div>
        <Select
          disabled={itemsQuery.isLoading()}
          value={sortBy()}
          onChange={(value) => value && setSortBy(value)}
          options={["missing", "name", "stock"]}
          itemComponent={(props) => (
            <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
          )}
        >
          <SelectTrigger class="w-full sm:w-[180px]">
            <SelectValue<string>>
              {(state) => state.selectedOption()}
            </SelectValue>
          </SelectTrigger>
          <SelectContent />
        </Select>
      </div>

      {/* Items Grid */}
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <For
          each={filteredAndSortedItems()}
          fallback={
            <Show
              when={itemsQuery.isLoading()}
              fallback={<p>No items found.</p>}
            >
              <p>Loading...</p>
            </Show>
          }
        >
          {(item) => <ItemCard item={item} />}
        </For>
      </div>
    </main>
  );
}
