import { useParams } from "@solidjs/router";
import { createComputed, createMemo, Show } from "solid-js";
import ItemDetailPage from "~/pages/item/detail/ItemDetail";
import {
  getUserItemUserUserIdItemItemIdGetOptions,
  updateItemUserUserIdItemItemIdPatchMutation,
} from "~/client/@tanstack/solid-query.gen";
import { useUser } from "~/providers/user/user.hooks";
import { useMutation, useQuery } from "@tanstack/solid-query";
import z from "zod";
import type { ItemCreate } from "~/client";

export function ItemDetailPageVM() {
  const params = useParams();
  // use zod to validate the id
  const itemId = z.coerce.number().positive().min(1).parse(params.id);
  const [user] = useUser();
  const currentApiPath = createMemo(() => ({
    user_id: user().id,
    item_id: itemId,
  }));
  const item = useQuery(() =>
    getUserItemUserUserIdItemItemIdGetOptions({
      path: currentApiPath(),
    })
  );

  const updateItem = useMutation(() =>
    updateItemUserUserIdItemItemIdPatchMutation()
  );

  createComputed(() => {
    if (item.error) {
      throw new Error("Could not load item");
    }
  });

  const handleSubmit = async (values: ItemCreate) => {
    console.log("handleSubmit", values);
    await updateItem.mutateAsync({ query: values, path: currentApiPath() });
    console.log("handleSubmit done");
  };

  return (
    <Show when={item.data} keyed>
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
