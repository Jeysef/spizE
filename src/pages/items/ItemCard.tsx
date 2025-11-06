import { A } from "@solidjs/router";
import type { ItemResponse } from "~/client";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";

// Reusable component for displaying a single item in the list
export function ItemCard(props: { item: ItemResponse }) {
  const progress = () => {
    if (props.item.full_quantity === 0) return 100; // Fully stocked if target is 0
    return (props.item.current_quantity / props.item.full_quantity) * 100;
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
          <p class="text-sm font-medium text-muted-foreground">{`${props.item.current_quantity} / ${props.item.full_quantity}`}</p>
        </div>
      </CardContent>
      <CardFooter>
        <A
          href={`/item/${props.item.id}`}
          class={cn(buttonVariants({ variant: "outline" }), "w-full")}
        >
          View Details
        </A>
      </CardFooter>
    </Card>
  );
}
