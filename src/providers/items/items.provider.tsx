import { ItemsContext } from "./items.context";
import { useUser } from "~/providers/user/user.hooks";
import { createItemsCollectionOptions } from "~/db/collections";
import { createMemo, type ParentProps } from "solid-js";
import { itemsSync } from "~/providers/items/items.sync";

/**
 * Wrap your app with <UserProvider> to provide a global user id signal.
 * Optionally pass initialId or it will try to read from localStorage.
 */
export function ItemsProvider(props: ParentProps) {
  const [user] = useUser();
  const itemsCollection = createMemo(() =>
    createItemsCollectionOptions(() => user().id)
  );

  itemsSync(itemsCollection, user().id);
  return (
    <ItemsContext.Provider value={itemsCollection}>
      {props.children}
    </ItemsContext.Provider>
  );
}
