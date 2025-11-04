import { A } from "@solidjs/router";
import { For } from "solid-js";
import type { ItemResponse } from "~/client";
import { PantryItem } from "~/components/PantryItem";
import Heading from "~/components/typography/heading";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Empty, EmptyContent, EmptyTitle } from "~/components/ui/empty";

interface HomeProps {
  missingItems: ItemResponse[];
  lowStockItems: ItemResponse[];
}

export default function Home(props: HomeProps) {
  return (
    <section class="p-8 gap-4 flex flex-col">
      <Heading variant={"h1"} class="text-2xl font-bold">
        Dashboard
      </Heading>
      <div class=" gap-4 flex flex-row flex-wrap">
        <Card class="basis-80 shrink">
          <CardHeader>
            <CardTitle>Add Items</CardTitle>
            <CardDescription>Add new items to your pantry</CardDescription>
          </CardHeader>
          <CardContent>
            <A href="/items/add" class={buttonVariants()}>
              Add Item
            </A>
          </CardContent>
          <CardHeader>
            <CardTitle>Want to know what to buy?</CardTitle>
            <CardDescription>Go to the shopping page</CardDescription>
          </CardHeader>
          <CardContent>
            <A href="/shopping" class={buttonVariants()}>
              Shopping
            </A>
          </CardContent>
        </Card>
        {/* <CardFooter>
            <Button variant="outline" class="w-full">
              Add Item
            </Button>
          </CardFooter> */}
        <Card class="basis-80 shrink">
          <CardHeader>
            <CardTitle class="text-destructive">Missing</CardTitle>
            <CardDescription>3 items need to be added</CardDescription>
          </CardHeader>
          <CardContent>
            <ul class="divide-y divide-gray-200">
              <For
                each={props.missingItems}
                fallback={
                  <Empty>
                    <EmptyContent>
                      <EmptyTitle>No items missing</EmptyTitle>
                    </EmptyContent>
                  </Empty>
                }
              >
                {(item) => (
                  <li class="flex items-center justify-between py-4 space-x-4">
                    <PantryItem
                      name={item.name}
                      quantity={item.current_quantity}
                      fullQuantity={item.full_quantity}
                      id={item.id}
                    />
                  </li>
                )}
              </For>
            </ul>
          </CardContent>
        </Card>
        <Card class="basis-80 shrink">
          <CardHeader>
            <CardTitle class="text-orange-500">Low stock</CardTitle>
            <CardDescription>2 items are low in stock</CardDescription>
          </CardHeader>
          <CardContent>
            <ul class="divide-y divide-gray-200">
              <For
                each={props.lowStockItems}
                fallback={
                  <Empty>
                    <EmptyContent>
                      <EmptyTitle>No items low in stock</EmptyTitle>
                    </EmptyContent>
                  </Empty>
                }
              >
                {(item) => (
                  <li class="flex items-center justify-between py-4 space-x-4">
                    <PantryItem
                      name={item.name}
                      quantity={item.current_quantity}
                      fullQuantity={item.full_quantity}
                      id={item.id}
                    />
                  </li>
                )}
              </For>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
