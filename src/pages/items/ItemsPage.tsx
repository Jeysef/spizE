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

const ALL_CATEGORY = { id: -1, name: "Všechny" };

interface ItemsPageProps {
  items: ItemResponse[];
  categories: CategoryResponse[] | undefined;
  units: UnitResponse[] | undefined;
  users: UserResponse[] | undefined;
  isLoading: boolean;
  nameFilter: string;
  setNameFilter: (value: string) => void;
  categoryFilter: number[];
  setCategoryFilter: (value: number[]) => void;
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

        <div class="flex items-center gap-2 justify-end">
          Kategorie:
          <Select<CategoryResponse>
            multiple
            options={[ALL_CATEGORY, ...(props.categories || [])]}
            optionValue="id"
            optionTextValue="name"
            value={
              props.categoryFilter.length === 0
                ? [ALL_CATEGORY]
                : props.categories?.filter((c) =>
                  props.categoryFilter.includes(c.id)
                )
            }
            onChange={(v) => {
              if (!v) {
                props.setCategoryFilter([]);
                return;
              }
              const hasAll = v.some((c) => c.id === -1);
              const hadAll = props.categoryFilter.length === 0;

              if (hasAll) {
                if (hadAll) {
                  // Was All, now All + something else -> Remove All
                  const others = v.filter((c) => c.id !== -1).map((c) => c.id);
                  props.setCategoryFilter(others);
                } else {
                  // Was Not All, now All added -> Set to All
                  props.setCategoryFilter([]);
                }
              } else {
                const newIds = v.map((c) => c.id);
                props.setCategoryFilter(newIds);
              }
            }}
            placeholder="Všechny"
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.textValue}</SelectItem>
            )}
          >
            <SelectTrigger class="w-[180px]">
              <SelectValue<CategoryResponse>>
                {(state) => {
                  const options = state.selectedOptions();
                  if (options.length === 0 || !options) return "Všechny";
                  if (options.length === 1) return options[0].name;
                  return `${options.length} vybráno`;
                }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
        <div class="flex items-center gap-2 justify-end">
          Řadit podle:
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
            <SelectTrigger class=" flex sm:w-[180px]">
              <SelectValue<{ value: string; label: string }>>
                {(state) => state.selectedOption().label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
      </div>

      {/* Items Grid */}
      <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
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
