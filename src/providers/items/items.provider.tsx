import { ItemsContext } from "./items.context";
import { useUser } from "~/providers/user/user.hooks";
import { createItemsCollectionOptions } from "~/db/collections";
import type { ParentProps } from "solid-js";

/**
 * Wrap your app with <UserProvider> to provide a global user id signal.
 * Optionally pass initialId or it will try to read from localStorage.
 */
export function ItemsProvider(props: ParentProps) {
  const [user] = useUser();
  return (
    <ItemsContext.Provider
      value={createItemsCollectionOptions(() => user().id)}
    >
      {props.children}
    </ItemsContext.Provider>
  );
}
