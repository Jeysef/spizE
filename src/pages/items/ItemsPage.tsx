import { For, Show } from "solid-js";
import type { ItemResponse } from "~/client";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ItemCard } from "~/pages/items/ItemCard";

interface ItemsPageProps {
  items: ItemResponse[];
  isLoading: boolean;
  nameFilter: string;
  setNameFilter: (value: string) => void;
  sortBy: string;
  sortByOptions: readonly string[];
  setSortBy: (value: string) => void;
}
// The main component for the Items page
export function ItemsPage(props: ItemsPageProps) {
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
            disabled={props.isLoading}
            placeholder="Filter items by name..."
            value={props.nameFilter}
            onInput={(e) => props.setNameFilter(e.currentTarget.value)}
          />
        </div>
        <Select
          disabled={props.isLoading}
          value={props.sortBy}
          onChange={(value) => value && props.setSortBy(value)}
          options={props.sortByOptions as string[]}
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
          each={props.items}
          fallback={
            <Show when={props.isLoading} fallback={<p>No items found.</p>}>
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
