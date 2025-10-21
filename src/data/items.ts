import type { Item } from "~/pages/item/types";

export const data: Record<string, Item> = {
  "1": {
    id: "1",
    name: "Bread",
    quantity: 1,
    fullQuantity: 2,
  },
  "2": {
    id: "2",
    name: "Milk",
    quantity: 8,
    fullQuantity: 10,
  },
  "3": {
    id: "3",
    name: "Eggs",
    quantity: 5,
    fullQuantity: 10,
  },
  "4": {
    id: "4",
    name: "Cheese",
    quantity: 1,
    fullQuantity: 2,
  },
  "5": {
    id: "5",
    name: "Yogurt",
    quantity: 8,
    fullQuantity: 10,
  },
  "6": {
    id: "6",
    name: "Bananas",
    quantity: 1,
    fullQuantity: 2,
  },
};

export const mockFetch = async (id: string) => {
  return Object.values(data).find((item) => item.id === id);
};
