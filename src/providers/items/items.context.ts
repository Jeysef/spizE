import { createContext } from "solid-js";
import type { ItemsCollectionType } from "~/db/collections";

export const ItemsContext = createContext<ItemsCollectionType>();
