import { useNavigate } from "@solidjs/router";
import { useLiveQuery } from "@tanstack/solid-db";
import { type ItemCreate } from "~/client";
import { categoriesCollection } from "~/db/collections";
import ItemNewPage from "~/pages/item/new/itemNew";
import { useItems } from "~/providers/items/items.hooks";
import { useUser } from "~/providers/user/user.hooks";

export function ItemNewPageVM() {
  const navigate = useNavigate();
  const [user] = useUser();
  const collection = useItems();

  const categoriesQuery = useLiveQuery((q) =>
    q.from({ categories: categoriesCollection })
  );

  const handleSubmit = async (values: ItemCreate) => {
    // try {
    //   // const tx = collection.insert(values);
    //   // await tx.isPersisted.promise;
    //   const resp = await mutation.mutateAsync({
    //     path: { user_id: user().id },
    //     body: values,
    //     throwOnError: true,
    //     responseValidator: async (data) => {
    //       return await z.number().parseAsync(data);
    //     },
    //   });
    const keys = Array.from(collection().keys());
    console.log("🚀 ~ handleSubmit ~ keys:", keys);
    const nextId = keys.length ? Math.max(...keys) + 1 : 1;
    console.log("🚀 ~ handleSubmit ~ nextId:", nextId);
    const tx = collection().insert({ ...values, id: nextId });
    await tx.isPersisted.promise;

    // const id = resp as unknown as number;
    console.log("🚀 ~ handleSubmit ~ id:");

    // await collection().stateWhenReady();
    // collection().utils.writeInsert({
    //   id: id,
    //   name: values.name,
    //   full_quantity: values.full_quantity,
    //   current_quantity: values.current_quantity,
    //   category_id: values.category_id,
    //   note: values.note,
    // });
    // collection().utils.refetch();

    // TODO: use the mutation response to get the item ID

    // Navigate to the new item's detail page or back to the list
    // For now, let's navigate back to the dashboard
    navigate("/");
  };

  // const handleSubmit2 = createOptimisticAction<ItemCreate>({
  //   onMutate: (values) => {
  //     // Optimistic guess at the change
  //     collection.insert({
  //       id: postId,
  //       name: values.name,
  //       full_quantity: values.full_quantity,
  //       current_quantity: values.current_quantity,
  //       category_id: values.category_id,
  //       note: values.note,
  //     });
  //   },
  //   mutationFn: async (postId) => {
  //     // Send the intent to the server
  //     await api.posts.like(postId);
  //     // Server determines actual state changes
  //     await postCollection.utils.refetch();
  //   },
  // });

  return (
    <ItemNewPage onSubmit={handleSubmit} categories={categoriesQuery.data} />
  );
}
