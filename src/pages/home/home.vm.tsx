import { useLiveQuery } from "@tanstack/solid-db";
import { createMemo } from "solid-js";
import Home from "~/pages/home/home";
import { useItems } from "~/providers/items/items.hooks";

export default function HomeViewModel() {
  const collection = useItems();
  const itemsQuery = useLiveQuery((q) => q.from({ items: collection() }));

  const missingItems = createMemo(() =>
    itemsQuery.data?.filter((item) => item.current_quantity <= 0)
  );

  const lowStockItems = createMemo(() =>
    itemsQuery.data?.filter(
      (item) =>
        item.current_quantity < item.full_quantity && item.current_quantity > 0
    )
  );

  const cards = () => [
    {
      title: "Missing",
      description: `${missingItems().length} items need to be added`,
      items: missingItems(),
      emptyMsg: "No items missing",
      color: "text-destructive",
    },
    {
      title: "Low Stock",
      description: `${lowStockItems().length} items are low in stock`,
      items: lowStockItems(),
      emptyMsg: "No items low in stock",
      color: "text-orange-500",
    },
  ];

  return <Home cards={cards()} loding={itemsQuery.isLoading()} />;
}
