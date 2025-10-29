import { useParams } from "@solidjs/router";
import { createComputed, Show } from "solid-js";
import ItemDetailPage from "~/pages/item/detail/ItemDetail";
import { getUserItemUserUserIdItemItemIdGetOptions } from "~/client/@tanstack/solid-query.gen";
import { useUser } from "~/providers/user/user.hooks";
import { useQuery } from "@tanstack/solid-query";
import z from "zod";

export function ItemDetailPageVM() {
  const params = useParams();
  // use zod to validate the id
  const itemId = z.coerce.number().positive().min(1).parse(params.id);
  const [user] = useUser();
  const item = useQuery(() =>
    getUserItemUserUserIdItemItemIdGetOptions({
      path: { user_id: user().id, item_id: itemId },
    })
  );

  createComputed(() => {
    if (item.error) {
      throw new Error("Could not load item");
    }
  });

  return (
    <Show when={item.data} keyed>
      {(data) => (
        <ItemDetailPage
          item={data}
          handleDelete={() => {}}
          onError={() => {}}
          onSubmit={() => {}}
        />
      )}
    </Show>
  );
}
