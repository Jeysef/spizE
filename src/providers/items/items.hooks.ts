import { useContext } from "solid-js";
import { ItemsContext } from "~/providers/items/items.context";

export function useItems() {
  const user = useContext(ItemsContext);
  if (user === undefined) {
    throw new Error("useItems must be used within a ItemsProvider");
  }
  return user;
}
