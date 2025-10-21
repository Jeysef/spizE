import { A } from "@solidjs/router";
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

export default function Home() {
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
              <li class="flex items-center justify-between py-4 space-x-4">
                <PantryItem name="Bread" quantity={1} fullQuantity={2} id="1" />
              </li>
              <li class="flex items-center justify-between py-4 space-x-4">
                <PantryItem name="Milk" quantity={8} fullQuantity={10} id="2" />
              </li>
              <li class="flex items-center justify-between py-4 space-x-4">
                <PantryItem name="Eggs" quantity={5} fullQuantity={10} id="3" />
              </li>
              <li class="flex items-center justify-between py-4 space-x-4">
                <PantryItem
                  name="Cheese"
                  quantity={1}
                  fullQuantity={2}
                  id="4"
                />
              </li>
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
              <li class="flex items-center justify-between py-4 space-x-4">
                <PantryItem
                  name="Yogurt"
                  quantity={1}
                  fullQuantity={2}
                  id="5"
                />
              </li>
              <li class="flex items-center justify-between py-4 space-x-4">
                <PantryItem
                  name="Banana"
                  quantity={8}
                  fullQuantity={10}
                  id="6"
                />
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
