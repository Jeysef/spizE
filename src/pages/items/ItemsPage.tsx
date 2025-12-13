import { createSignal } from "solid-js";
import { For, Show } from "solid-js";
import type {
  CategoryResponse,
  ItemResponse,
  UnitResponse,
  UserResponse,
} from "~/client";
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
  categories: CategoryResponse[] | undefined;
  units: UnitResponse[] | undefined;
  users: UserResponse[] | undefined;
  isLoading: boolean;
  nameFilter: string;
  setNameFilter: (value: string) => void;
  sortBy: { value: string; label: string };
  sortByOptions: { value: string; label: string }[];
  setSortBy: (value: { value: string; label: string }) => void;
  onUpdateItem: (id: number, changes: Partial<ItemResponse>) => Promise<void>;
  onDeleteItem: (id: number) => Promise<void>;
}
// The main component for the Items page
export function ItemsPage(props: ItemsPageProps) {

  const [opened, setOpened] = createSignal(-1);

  return (
    <main class="container mx-auto px-4 py-8 pb-32">
      <div class="mb-8">
        <h1 class="text-4xl font-extrabold tracking-tight text-primary">Položky</h1>
        {/* <p class="text-muted-foreground">
          Browse and manage all items in your pantry.
        </p> */}
      </div>

      {/* Filter and Sort Controls */}
      <div class="mb-6 flex flex-col gap-4 sm:flex-row">
        <div class="grow">
          <Input
            disabled={props.isLoading}
            placeholder="Filtrovat podle jména..."
            value={props.nameFilter}
            onInput={(e) => props.setNameFilter(e.currentTarget.value)}
          />
        </div>
        <Select
          disabled={props.isLoading}
          value={props.sortBy}
          onChange={(value) => value && props.setSortBy(value)}
          optionValue="value"
          optionTextValue="label"
          options={props.sortByOptions}

          itemComponent={(props) => (
            <SelectItem item={props.item}>{props.item.textValue}</SelectItem>
          )}
        >
          <SelectTrigger class="w-full sm:w-[180px]">
            <SelectValue<{ value: string; label: string }>>
              {(state) => state.selectedOption().label}
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
            <Show when={props.isLoading} fallback={<p>Žádné položky nenalezeny.</p>}>
              <p>Načítání...</p>
            </Show>
          }
        >
          {(item) => (
            <ItemCard
              item={item}
              allCategories={props.categories}
              allUnits={props.units}
              allUsers={props.users}
              onUpdate={props.onUpdateItem}
              onDelete={props.onDeleteItem}
              opened={opened() === item.id}
              onOpenChange={(open) => {
                if (!open) {
                  setOpened(-1);
                } else {
                  setOpened(item.id);
                }
              }}
            />
          )}
        </For>
      </div>
    </main>
  );
}
