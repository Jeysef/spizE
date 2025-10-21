import { createAsync, query } from "@solidjs/router";
import { mockFetch } from "~/data/items";

function wait<T>(ms: number, data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, ms, data));
}

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getItem = query(
  async (id: string) => wait(random(500, 1000), await mockFetch(id)),
  "itemData"
);

const ItemData = (id: string) => {
  return createAsync(() => getItem(id));
};

export default ItemData;
export type ItemDataType = typeof ItemData;
