import { useParams } from "@solidjs/router";
import { Show } from "solid-js";
import ItemDetailPage from "~/pages/item/detail/ItemDetail";
import { useUser } from "~/providers/user/user.hooks";
import z from "zod";
import type { ItemCreate } from "~/client";
import { eq, useLiveQuery } from "@tanstack/solid-db";
import { createItemsCollectionOptions } from "~/db/collections";
import { merge } from "~/lib/utils";

export function ItemDetailPageVM() {
  const params = useParams();
  // use zod to validate the id
  const itemId = z.coerce.number().positive().min(1).parse(params.id);
  const [user] = useUser();
  const collection = createItemsCollectionOptions(() => user().id);
  const itemsQuery = useLiveQuery((q) =>
    q
      .from({ items: collection })
      .where(({ items }) => eq(items.id, itemId))
      .findOne()
  );

  // createComputed(() => {
  //   if (itemsQuery.isError()) {
  //     throw new Error("Could not load item");
  //   }
  // });

  const handleSubmit = async (values: ItemCreate) => {
    const tx = collection.update(itemId, merge(values));
    await tx.isPersisted.promise;
  };

  return (
    <Show when={itemsQuery.data?.[0]} keyed>
      {(data) => (
        <ItemDetailPage
          item={data}
          handleDelete={() => {}}
          onError={() => {}}
          onSubmit={handleSubmit}
        />
      )}
    </Show>
  );
}
