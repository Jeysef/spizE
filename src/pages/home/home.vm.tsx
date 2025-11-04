import { useLiveQuery } from "@tanstack/solid-db";
import { createMemo } from "solid-js";
import { createItemsCollectionOptions } from "~/db/collections";
import Home from "~/pages/home/home";
import { useUser } from "~/providers/user/user.hooks";

export default function HomeViewModel() {
  const [user] = useUser();

  const itemsQuery = useLiveQuery((q) =>
    q.from({ users: createItemsCollectionOptions(() => user().id) })
  );

  const missingItems = createMemo(() =>
    itemsQuery.data?.filter((item) => item.current_quantity <= 0)
  );

  const lowStockItems = createMemo(() =>
    itemsQuery.data?.filter(
      (item) => item.current_quantity < item.full_quantity
    )
  );

  return <Home missingItems={missingItems()} lowStockItems={lowStockItems()} />;
}
