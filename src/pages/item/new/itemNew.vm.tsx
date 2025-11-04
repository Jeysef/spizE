import { useNavigate } from "@solidjs/router";
import { useMutation } from "@tanstack/solid-query";
import { type ItemCreate } from "~/client";
import { createItemUserUserIdItemNewPutMutation } from "~/client/@tanstack/solid-query.gen";
import { createItemsCollectionOptions } from "~/db/collections";
import ItemNewPage from "~/pages/item/new/itemNew";
import { useUser } from "~/providers/user/user.hooks";

export function ItemNewPageVM() {
  const navigate = useNavigate();
  const [user] = useUser();
  const collection = createItemsCollectionOptions(() => user().id);

  const mutation = useMutation(() => createItemUserUserIdItemNewPutMutation());

  const handleSubmit = async (values: ItemCreate) => {
    try {
      // const tx = collection.insert(values);
      // await tx.isPersisted.promise;
      const resp = await mutation.mutateAsync({
        path: { user_id: user().id },
        body: values,
        throwOnError: true,
      });

      // TODO: use the mutation response to get the item ID

      // Navigate to the new item's detail page or back to the list
      // For now, let's navigate back to the dashboard
      navigate("/");
    } catch (error) {
      console.error("Failed to create item:", error);
      // You could implement more robust error handling here,
      // like showing a toast notification to the user.
    }
  };

  return <ItemNewPage onSubmit={handleSubmit} />;
}
