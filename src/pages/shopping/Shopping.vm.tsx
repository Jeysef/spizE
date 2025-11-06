import { lt, useLiveQuery } from "@tanstack/solid-db";
import { createSignal } from "solid-js";
import ShoppingPage from "~/pages/shopping/ShoppingPage";
import { useItems } from "~/providers/items/items.hooks";

export function ShoppingVM() {
  const collection = useItems();
  const itemsQuery = useLiveQuery((q) =>
    q
      .from({ items: collection() })
      .where(({ items }) => lt(items.current_quantity, items.full_quantity))
  );

  const [touchedItems, setTouchedItems] = createSignal<number[]>([]);

  const data = () =>
    itemsQuery.data.filter((item) => !touchedItems().includes(item.id));

  const handleRefill = (itemId: number, quantity: number) => {
    collection().update(itemId, (prevItem) => {
      prevItem.current_quantity = prevItem.current_quantity + quantity;
    });
    setTouchedItems((prev) => [...prev, itemId]);
  };

  return (
    <ShoppingPage
      lowStockItems={data()}
      handleRefill={handleRefill}
      loading={itemsQuery.isLoading()}
    />
  );
}
