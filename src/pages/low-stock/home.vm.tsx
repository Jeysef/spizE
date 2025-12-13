import { useLiveQuery } from "@tanstack/solid-db";
import { createMemo } from "solid-js";
import Home from "~/pages/low-stock/home";
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
      title: "Chybějící",
      description: `${missingItems().length} chybí`,
      items: missingItems(),
      emptyMsg: "Žádné položky chybí",
      color: "text-destructive",
    },
    {
      title: "Docházející",
      description: `${lowStockItems().length} docházejí`,
      items: lowStockItems(),
      emptyMsg: "Žádné položky docházejí",
      color: "text-orange-500",
    },
  ];

  return <Home cards={cards()} loding={itemsQuery.isLoading()} />;
}
