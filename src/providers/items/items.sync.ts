import type { Accessor } from "solid-js";
import { isServer } from "solid-js/web";
import { sseEndpointSseGet } from "~/client";
import type { ItemsCollectionType } from "~/db/collections";

export async function itemsSync(
  collection: Accessor<ItemsCollectionType>,
  userId: number
) {
  // ex: data: {"event":"item_updated","user_id":1,"item_id":1}
  /*
  class EventType(str, Enum):
    HEALTH_CHECK = "health_check"
    ITEM_CREATED = "item_created"
    ITEM_UPDATED = "item_updated"
    ITEM_DELETED = "item_deleted"


class EventResponse(Base):
    event: EventType = Field(..., description="Event type")
    user_id: int = Field(..., description="User ID")
    item_id: int = Field(..., description="Item ID")
*/

  if (isServer) return;

  const { stream } = await sseEndpointSseGet();

  for await (const event of stream) {
    if (event.user_id !== userId) continue;
    const itemId = event.item_id;
    switch (event.event) {
      case "item_created":
      case "item_updated":
        collection().utils.refetch();
        break;
      case "item_deleted":
        collection().utils.writeDelete(itemId);
        break;
      case "health_check":
        console.log("SSE - healthy");
        break;
    }
  }
}
