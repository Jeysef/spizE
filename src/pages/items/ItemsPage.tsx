import { A } from "@solidjs/router";
import { createMemo, createSignal, For } from "solid-js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

// Export the Item interface to be used across the application
export interface Item {
  id: string;
  name: string;
  quantity: number;
  fullQuantity: number;
}

// Mock data representing the pantry items.
// In a real application, this would be fetched from an API.
const mockItems: Item[] = [
  { id: "1", name: "Bread", quantity: 1, fullQuantity: 2 },
  { id: "2", name: "Milk", quantity: 8, fullQuantity: 10 },
  { id: "3", name: "Eggs", quantity: 5, fullQuantity: 12 },
  { id: "4", name: "Cheese", quantity: 1, fullQuantity: 4 },
  { id: "5", name: "Yogurt", quantity: 1, fullQuantity: 6 },
  { id: "6", name: "Banana", quantity: 8, fullQuantity: 10 },
  { id: "7", name: "Apples", quantity: 0, fullQuantity: 8 },
  { id: "8", name: "Chicken Breast", quantity: 0, fullQuantity: 3 },
  { id: "9", name: "Spinach", quantity: 2, fullQuantity: 2 },
];

// Reusable component for displaying a single item in the list
function ItemCard(props: { item: Item }) {
  const progress = () => {
    if (props.item.fullQuantity === 0) return 100; // Fully stocked if target is 0
    return (props.item.quantity / props.item.fullQuantity) * 100;
  };

  return (
    <Card class="flex flex-col justify-between transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle>{props.item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-2 text-center">
          <Label>Stock Level</Label>
          <Progress value={progress()} />
          <p class="text-sm font-medium text-muted-foreground">{`${props.item.quantity} / ${props.item.fullQuantity}`}</p>
        </div>
      </CardContent>
      <CardFooter>
        <A
          href={`/item/${props.item.id}`}
          class="w-full rounded-md bg-primary p-2 text-center text-sm font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary/90"
        >
          View Details
        </A>
      </CardFooter>
    </Card>
  );
}

// The main component for the Items page
export default function ItemsPage() {
  const [items] = createSignal<Item[]>(mockItems);
  const [filter, setFilter] = createSignal("");
  const [sortBy, setSortBy] = createSignal("missing");

  // A memoized signal that filters and sorts the items based on user input
  const filteredAndSortedItems = createMemo(() => {
    const processedItems = items().filter((item) =>
      item.name.toLowerCase().includes(filter().toLowerCase())
    );

    switch (sortBy()) {
      case "name":
        processedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "stock":
        processedItems.sort(
          (a, b) => a.quantity / a.fullQuantity - b.quantity / b.fullQuantity
        );
        break;
      case "missing":
      default:
        processedItems.sort((a, b) => {
          // Primary sort: items with 0 quantity first
          if (a.quantity === 0 && b.quantity > 0) return -1;
          if (b.quantity === 0 && a.quantity > 0) return 1;

          // Secondary sort: largest deficit (fullQuantity - quantity)
          const deficitA = a.fullQuantity - a.quantity;
          const deficitB = b.fullQuantity - b.quantity;
          return deficitB - deficitA;
        });
        break;
    }

    return processedItems;
  });

  return (
    <main class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold tracking-tight">Pantry Items</h1>
        <p class="text-muted-foreground">
          Browse and manage all items in your pantry.
        </p>
      </div>

      {/* Filter and Sort Controls */}
      <div class="mb-6 flex flex-col gap-4 sm:flex-row">
        <div class="flex-grow">
          <Input
            placeholder="Filter items by name..."
            value={filter()}
            onInput={(e) => setFilter(e.currentTarget.value)}
          />
        </div>
        <Select
          value={sortBy()}
          onChange={(value) => value && setSortBy(value)}
          options={["missing", "name", "stock"]}
          itemComponent={(props) => (
            <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
          )}
        >
          <SelectTrigger class="w-full sm:w-[180px]">
            <SelectValue<string>>
              {(state) => state.selectedOption()}
            </SelectValue>
          </SelectTrigger>
          <SelectContent />
        </Select>
      </div>

      {/* Items Grid */}
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <For each={filteredAndSortedItems()} fallback={<p>No items found.</p>}>
          {(item) => <ItemCard item={item} />}
        </For>
      </div>
    </main>
  );
}
