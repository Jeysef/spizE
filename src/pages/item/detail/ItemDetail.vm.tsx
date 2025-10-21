import { useParams } from "@solidjs/router";
import LoaderIcon from "lucide-solid/icons/loader";
import { Show, Suspense } from "solid-js";
import { Empty, EmptyHeader } from "~/components/ui/empty";
import ItemDetailPage from "~/pages/item/detail/ItemDetail";
import type { Item } from "~/pages/item/types";
import ItemData from "~/pages/item.data";

function ItemDetailPageDataProvider() {
  const params = useParams();
  const item = ItemData(params.id);
  return (
    <Suspense
      fallback={
        <Empty>
          <EmptyHeader>
            Loading...
            <LoaderIcon class="animate-spin" />
          </EmptyHeader>
        </Empty>
      }
    >
      <Show when={item()}>
        <ItemDetailPageVM item={item()!} />
      </Show>
    </Suspense>
  );
}

interface ItemDetailPageProps {
  item: Item;
}

// ItemDetail component
function ItemDetailPageVM(props: ItemDetailPageProps) {
  // Handler for deleting the item (outside of form submission logic)

  return (
    <ItemDetailPage
      item={props.item}
      handleDelete={() => {}}
      onError={() => {}}
      onSubmit={() => {}}
    />
  );
}

export default ItemDetailPageDataProvider;
