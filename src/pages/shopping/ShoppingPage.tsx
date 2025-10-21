import Check from "lucide-solid/icons/check";
import { createSignal, For } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

// Reusing the Item interface defined in previous pages
export interface Item {
  id: string;
  name: string;
  quantity: number;
  fullQuantity: number;
}

// Mock data representing all pantry items. In a real app, this would come from a global store or API.
const allPantryItems: Item[] = [
  { id: "1", name: "Bread", quantity: 1, fullQuantity: 2 },
  { id: "2", name: "Milk", quantity: 8, fullQuantity: 10 },
  { id: "3", name: "Eggs", quantity: 5, fullQuantity: 12 },
  { id: "4", name: "Cheese", quantity: 1, fullQuantity: 4 },
  { id: "5", name: "Yogurt", quantity: 1, fullQuantity: 6 },
  { id: "6", name: "Banana", quantity: 8, fullQuantity: 10 },
  { id: "7", name: "Apples", quantity: 0, fullQuantity: 8 },
  { id: "8", name: "Chicken Breast", quantity: 0, fullQuantity: 3 },
  { id: "9", name: "Spinach", quantity: 2, fullQuantity: 2 }, // This one is full, so it won't appear
];

// Reusable component for displaying a single item in the shopping list
function ShoppingItemCard(props: { item: Item; onDone: (id: string) => void }) {
  // Calculate how many units of the item are needed
  const quantityToBuy = () => props.item.fullQuantity - props.item.quantity;

  return (
    <div class="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div>
        <p class="text-lg font-semibold">{props.item.name}</p>
        <p class="text-sm text-muted-foreground">
          Need to buy:{" "}
          <span class="font-medium text-foreground">{quantityToBuy()}</span>
        </p>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => props.onDone(props.item.id)}
      >
        <Check class="h-4 w-4" />
        <span class="sr-only">Mark as done</span>
      </Button>
    </div>
  );
}

// The main component for the Shopping List page
export default function ShoppingPage() {
  // Filter the main pantry list to get only the items that need to be bought
  const initialShoppingList = allPantryItems.filter(
    (item) => item.quantity < item.fullQuantity
  );

  // Create a signal to manage the state of the shopping list
  const [shoppingList, setShoppingList] =
    createSignal<Item[]>(initialShoppingList);

  // Handler to remove an item from the list when it's marked as "done"
  const handleItemDone = (itemId: string) => {
    setShoppingList((prevList) =>
      prevList.filter((item) => item.id !== itemId)
    );
    // In a real application, you might also want to update the item's quantity
    // in your global state or database to reflect that it's been purchased.
  };

  return (
    <div class="container mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle class="text-3xl font-bold tracking-tight">
            Shopping List
          </CardTitle>
          <CardDescription>
            Here are the items you need to buy to restock your pantry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-3">
            <For
              each={shoppingList()}
              fallback={
                <div class="rounded-lg border-2 border-dashed border-border p-8 text-center">
                  <h3 class="text-lg font-semibold">All Stocked Up!</h3>
                  <p class="text-muted-foreground">
                    Your pantry is full. There's nothing to buy.
                  </p>
                </div>
              }
            >
              {(item) => (
                <ShoppingItemCard item={item} onDone={handleItemDone} />
              )}
            </For>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
