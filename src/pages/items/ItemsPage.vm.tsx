import { useLiveQuery } from "@tanstack/solid-db";
import { createMemo, createSignal } from "solid-js";
import { ItemsPage } from "~/pages/items/ItemsPage";
import { useItems } from "~/providers/items/items.hooks";

export function ItemsPageVM() {
  const sortByOptions = ["missing", "name", "stock"] as const;
  const [nameFilter, setNameFilter] = createSignal("");
  const [sortBy, setSortBy] =
    createSignal<(typeof sortByOptions)[number]>("missing");

  const collection = useItems();
  const itemsQuery = useLiveQuery((q) => q.from({ items: collection() }));

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
    <ItemsPage
      items={filteredAndSortedItems()}
      isLoading={itemsQuery.isLoading()}
      nameFilter={nameFilter()}
      setNameFilter={setNameFilter}
      sortBy={sortBy()}
      setSortBy={setSortBy}
      sortByOptions={sortByOptions}
    />
  );
}
