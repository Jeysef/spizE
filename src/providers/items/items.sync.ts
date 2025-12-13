import { createEffect, onCleanup, type Accessor } from "solid-js";
import { isServer } from "solid-js/web";
import { sseEndpointSseGet, getUserItemUserUserIdItemItemIdGet } from "~/client";
import type { ItemsCollectionType } from "~/db/collections";

export function itemsSync(
  collection: Accessor<ItemsCollectionType>,
  userId: Accessor<number>
) {
  if (isServer) return;

  createEffect(() => {
    const id = userId();
    const ac = new AbortController();

    // Start the reconnection loop
    runReconnectingEventLoop(collection, id, ac.signal);

    onCleanup(() => {
      ac.abort();
    });
  });
}

async function runReconnectingEventLoop(
  collection: Accessor<ItemsCollectionType>,
  userId: number,
  signal: AbortSignal
) {
  let retryCount = 0;

  while (!signal.aborted) {
    try {
      console.log("Connecting to SSE...");
      // Ideally we pass signal to the client if it supports it, 
      // but assuming it returns a stream we can just stop iterating.
      const { stream } = await sseEndpointSseGet();
      console.log("SSE Connected");

      retryCount = 0; // Reset retry count on successful connection (or at least successful stream start)

      for await (const event of stream) {
        if (signal.aborted) break;
        if (event.user_id !== userId) continue;
        const itemId = event.item_id;

        switch (event.event) {
          case "item_created": {
            console.log("SSE item_created", itemId);
            const { data } = await getUserItemUserUserIdItemItemIdGet({
              path: { user_id: userId, item_id: itemId },
            });
            if (data) collection().utils.writeInsert(data);
            break;
          }
          case "item_updated": {
            console.log("SSE item_updated", itemId);
            const { data } = await getUserItemUserUserIdItemItemIdGet({
              path: { user_id: userId, item_id: itemId },
            });
            if (data) collection().utils.writeUpdate(data);
            break;
          }
          case "item_deleted":
            console.log("SSE item_deleted", itemId);
            collection().utils.writeDelete(itemId);
            break;
          case "health_check":
            console.log("SSE - healthy");
            break;
        }
      }
      console.log("SSE Stream ended");
    } catch (error) {
      if (signal.aborted) return;
      console.error("SSE Error:", error);
    }

    if (signal.aborted) break;

    // Retry with backoff
    const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
    console.log(`SSE Reconnecting in ${delay}ms...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    retryCount++;
  }
}
