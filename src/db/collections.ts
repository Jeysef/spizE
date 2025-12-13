import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/solid-db";
import { QueryClient } from "@tanstack/solid-query";
import type { Accessor } from "solid-js";
import z from "zod";
import {
  type CategoryResponse,
  createItemUserUserIdItemNewPut,
  deleteItemUserUserIdItemItemIdDelete,
  getCategoriesCategoryAllGet,
  getUserItemsUserUserIdItemAllGet,
  getUsersUserAllGet,
  type ItemResponse,
  type UserResponse,
  updateItemUserUserIdItemItemIdPatch,
  getUnitsUnitAllGet,
  type UnitResponse,
} from "~/client";
import {
  getCategoriesCategoryAllGetQueryKey,
  getUserItemsUserUserIdItemAllGetQueryKey,
  getUsersUserAllGetQueryKey,
  getUnitsUnitAllGetQueryKey,
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
    // refetchInterval: 20000, // 20 second
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
      queryClient,
      enabled: !!selectedUserId(),
      queryKey: getUserItemsUserUserIdItemAllGetQueryKey({
        path: { user_id: selectedUserId() },
      }),

      queryFn: async ({ queryKey, signal }) => {
        const { data } = await getUserItemsUserUserIdItemAllGet({
          ...queryKey[0],
          signal,
          throwOnError: true,
        });
        return data;
      },

      getKey: (item: ItemResponse) => item.id,
      onUpdate: async ({ transaction }) => {
        await Promise.all(
          transaction.mutations.map((mutation) =>
            updateItemUserUserIdItemItemIdPatch({
              path: {
                user_id: selectedUserId(),
                item_id: mutation.modified.id,
              },
              query: {
                quantity: mutation.changes.current_quantity,
                full_quantity: mutation.changes.full_quantity,
                category_id: mutation.changes.category_id,
                note: mutation.changes.note,
                name: mutation.changes.name,
                unit_id: mutation.changes.unit_id,
                modify_by: mutation.changes.modify_by,
              },
            })
          )
        );
        return { refetch: false };
      },
      onDelete: async ({ transaction }) => {
        await Promise.all(
          transaction.mutations.map((mutation) =>
            deleteItemUserUserIdItemItemIdDelete({
              path: {
                user_id: selectedUserId(),
                item_id: mutation.modified.id,
              },
            })
          )
        );
        return { refetch: false };
      },
      onInsert: async ({ transaction }) => {
        await Promise.all(
          transaction.mutations.map((mutation) =>
            createItemUserUserIdItemNewPut({
              path: { user_id: selectedUserId() },
              body: mutation.modified,
              responseValidator: async (data) => {
                return await z.number().parseAsync(data);
              },
            })
          )
        );
        return { refetch: false };
      },
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
    // refetchInterval: 50000, // 50 second
  })
);

export const unitsCollection = createCollection(
  queryCollectionOptions({
    queryKey: getUnitsUnitAllGetQueryKey(),
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await getUnitsUnitAllGet({
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryClient,
    getKey: (item: UnitResponse) => item.id,
    // refetchInterval: 50000,
  })
);
