import { toast } from "solid-sonner";
import { useLiveQuery } from "@tanstack/solid-db";
import { createEffect, createMemo, createSignal } from "solid-js";
import type { ItemResponse } from "~/client";
import {
  categoriesCollection,
  unitsCollection,
  usersCollection,
} from "~/db/collections";
import { merge } from "~/lib/utils";
import { ItemsPage } from "~/pages/items/ItemsPage";
import { useItems } from "~/providers/items/items.hooks";
import { NewItemInline } from "./NewItemInline";
import { Portal } from "solid-js/web";

export function ItemsPageVM() {
  // const sortByOptions = ["missing", "name", "stock", "last_edited"] as const;
  const sortByOptions = [
    {
      value: "last_edited",
      label: "Naposledy upraveno"
    }, {
      value: "missing",
      label: "Chybějící"
    }, {
      value: "name",
      label: "Název"
    }, {
      value: "stock",
      label: "Množství"
    },];
  const [nameFilter, setNameFilter] = createSignal("");
  const [sortBy, setSortBy] =
    createSignal<(typeof sortByOptions)[number]>(sortByOptions[0]);
  // Snapshot of timestamps to keep sort order stable during edits
  const [timestampSnapshot, setTimestampSnapshot] = createSignal<
    Record<number, string>
  >({});

  const collection = useItems();
  const itemsQuery = useLiveQuery((q) => q.from({ items: collection() }));
  const categoriesQuery = useLiveQuery((q) =>
    q.from({ categories: categoriesCollection })
  );
  const unitsQuery = useLiveQuery((q) => q.from({ units: unitsCollection }));
  const usersQuery = useLiveQuery((q) => q.from({ users: usersCollection }));

  // Maintain stable sort order for "last_edited"
  createEffect(() => {
    const items = itemsQuery.data;

    if (sortBy().value !== "last_edited") {
      setTimestampSnapshot({});
      return;
    }

    if (!items) return;

    setTimestampSnapshot((prev) => {
      const next = { ...prev };
      let hasChanges = false;

      for (const item of items) {
        if (!next[item.id]) {
          next[item.id] = item.last_edited;
          hasChanges = true;
        }
      }

      return hasChanges ? next : prev;
    });
  });

  const handleUpdateItem = async (
    id: number,
    changes: Partial<ItemResponse>
  ) => {
    const tx = collection().update(id, merge(changes));
    await tx.isPersisted.promise;
  };

  const handleDeleteItem = async (id: number) => {
    const item = itemsQuery.data?.find((i) => i.id === id);
    if (!item) return;

    const tx = collection().delete(id);
    await tx.isPersisted.promise;

    toast("Item has been deleted", {
      description: `${item.name} has been removed from the pantry.`,
      action: {
        label: "Undo",
        onClick: async () => {
          const tx = collection().insert(item);
          await tx.isPersisted.promise;
        },
      },
    });
  };

  const handleCreateItem = async (data: Partial<ItemResponse>) => {
    const item: ItemResponse = {
      // Temporary ID for optimistic update.
      // Real backend might ignore this or use it?
      // Since collection().insert expects an object that matches schema,
      // and usually the backend assigns ID, we might need to be careful.
      // However, for typical optimistic UI libraries, we provide a temporary ID.
      id: Math.floor(Math.random() * 10000000) * -1,
      name: data.name || "New Item",
      category_id: data.category_id || 0,
      current_quantity: data.current_quantity ?? 0,
      full_quantity: data.full_quantity ?? 1,
      note: data.note || "",
      last_edited: new Date().toISOString(),
      modify_by: data.modify_by || 1,
      unit_id: data.unit_id || 2, // ks
    } as ItemResponse;

    const tx = collection().insert(item);
    await tx.isPersisted.promise;
    toast("Item created", {
      description: `${item.name} has been added to the pantry.`,
    });
  };

  const filteredAndSortedItems = createMemo(() => {
    const items = itemsQuery.data;
    const snapshot = timestampSnapshot();
    const filteredItems = items?.filter((item) =>
      item.name.toLowerCase().includes(nameFilter().toLowerCase())
    );

    switch (sortBy().value) {
      case "name":
        filteredItems?.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "stock":
        filteredItems?.sort(
          (a, b) =>
            b.current_quantity / b.full_quantity -
            a.current_quantity / a.full_quantity
        );
        break;
      case "last_edited":
        filteredItems?.sort((a, b) => {
          const dateA = new Date(snapshot[a.id] || a.last_edited).getTime();
          const dateB = new Date(snapshot[b.id] || b.last_edited).getTime();
          return dateB - dateA;
        });
        break;
      case "missing":
      default:
        filteredItems?.sort((a, b) => {
          // Primary sort: items with 0 quantity first
          if (a.current_quantity === 0 && b.current_quantity > 0) return -1;
          if (b.current_quantity === 0 && a.current_quantity > 0) return 1;

          // Secondary sort: largest deficit (full_quantity - quantity)
          const deficitA = a.full_quantity - a.current_quantity;
          const deficitB = b.full_quantity - b.current_quantity;
          return deficitB - deficitA;
        });
        break;
    }

    return filteredItems;
  });
  return (
    <>
      <ItemsPage
        items={filteredAndSortedItems()}
        categories={categoriesQuery.data}
        units={unitsQuery.data}
        users={usersQuery.data}
        isLoading={itemsQuery.isLoading()}
        nameFilter={nameFilter()}
        setNameFilter={setNameFilter}
        sortBy={sortBy()}
        setSortBy={setSortBy}
        sortByOptions={sortByOptions}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />
      <Portal mount={document.querySelector("#bottom-navigation-top")!}>
        <NewItemInline
          categories={categoriesQuery.data}
          units={unitsQuery.data}
          users={usersQuery.data}
          onCreate={handleCreateItem}
        />
      </Portal>
    </>
  );
}
