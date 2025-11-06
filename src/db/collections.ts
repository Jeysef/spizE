import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/solid-db";
import { QueryClient } from "@tanstack/solid-query";
import type { Accessor } from "solid-js";
import {
  type CategoryResponse,
  getCategoriesCategoryAllGet,
  getUserItemsUserUserIdItemAllGet,
  getUsersUserAllGet,
  type ItemResponse,
  type UserResponse,
  updateItemUserUserIdItemItemIdPatch,
} from "~/client";
import {
  getCategoriesCategoryAllGetQueryKey,
  getUserItemsUserUserIdItemAllGetQueryKey,
  getUsersUserAllGetQueryKey,
} from "~/client/@tanstack/solid-query.gen";

const queryClient = new QueryClient();

export const usersCollection = createCollection(
  queryCollectionOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getUsersUserAllGet({
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      console.log("🚀 ~ data:", data);
      return data;
    },
    queryKey: getUsersUserAllGetQueryKey(),
    queryClient,
    getKey: (item: UserResponse) => item.id,
    // refetchInterval: 10000, // 10 second
    // schema: zGetUsersUserAllGetResponse,
  })
);

// export const itemsCollection = createCollection(
//   queryCollectionOptions({
//     ...(getUserItemsUserUserIdItemAllGetOptions({
//       path: { user_id: 1 },
//     }) as any),
//     queryClient,
//     getKey: (item: UserResponse) => item.id,
//     refetchInterval: 1000, // 1 second
//     schema: zGetUsersUserAllGetResponse,
//   })
// );
export const createItemsCollectionOptions = (
  selectedUserId: Accessor<number>
) =>
  createCollection(
    queryCollectionOptions({
      enabled: !!selectedUserId(),

      queryKey: getUserItemsUserUserIdItemAllGetQueryKey({
        path: { user_id: selectedUserId() },
      }),

      // 2. The query function gets the user ID from the query key to make the API call.
      queryFn: async ({ queryKey, signal }) => {
        const { data } = await getUserItemsUserUserIdItemAllGet({
          ...queryKey[0],
          signal,
          throwOnError: true,
        });
        return data;
      },

      // 3. The query is only enabled when a user ID is actually selected.
      // enabled: selectedUserId(),

      queryClient,
      // refetchInterval: 1000, // 1 second
      getKey: (item: ItemResponse) => item.id,
      onUpdate: async ({ transaction }) => {
        const { original, changes } = transaction.mutations[0];
        const { data } = await updateItemUserUserIdItemItemIdPatch({
          path: { user_id: selectedUserId(), item_id: original.id },
          query: {
            quantity: changes.current_quantity,
            full_quantity: changes.full_quantity,
            category_id: changes.category_id,
            note: changes.note,
            name: changes.name,
          },
          throwOnError: true,
        });
        return data;
      },
      // onInsert: async ({ transaction }) => {
      //   await Promise.all(
      //     transaction.mutations.map((mutation) =>
      //       api.todos.create(mutation.modified)
      //     )
      //   );
      // },
      // onInsert: async ({ transaction }) => {
      //   await Promise.all(
      //     transaction.mutations.map((mutation) =>
      //       api.todos.create(mutation.modified)
      //     )
      //   );
      // },
      // schema: zGetUserItemsUserUserIdItemAllGetResponse,
    })
  );

export type ItemsCollectionType = ReturnType<
  typeof createItemsCollectionOptions
>;

export const categoriesCollection = createCollection(
  queryCollectionOptions({
    queryKey: getCategoriesCategoryAllGetQueryKey(),
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getCategoriesCategoryAllGet({
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryClient,
    getKey: (item: CategoryResponse) => item.id,
    // refetchInterval: 10000, // 10 second
  })
);
