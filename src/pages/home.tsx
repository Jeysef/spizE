import { PantryItem } from "~/components/PantryItem";
import Heading from "~/components/typography/heading";
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
      <Card>
        <CardHeader>
          <CardTitle class="text-destructive">Missing</CardTitle>
          <CardDescription>3 items need to be added</CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="divide-y divide-gray-200">
            <li class="flex items-center justify-between py-4 space-x-4">
              <PantryItem name="Bread" quantity="1/2" id="1" />
            </li>
            <li class="flex items-center justify-between py-4 space-x-4">
              <PantryItem name="Milk" quantity="8/10" id="2" />
            </li>
            <li class="flex items-center justify-between py-4 space-x-4">
              <PantryItem name="Eggs" quantity="5/10" id="3" />
            </li>
            <li class="flex items-center justify-between py-4 space-x-4">
              <PantryItem name="Cheese" quantity="1/2" id="4" />
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle class="text-orange-500">Low stock</CardTitle>
          <CardDescription>2 items are low in stock</CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="divide-y divide-gray-200">
            <li class="flex items-center justify-between py-4 space-x-4">
              <PantryItem name="Yogurt" quantity="1/2" id="5" />
            </li>
            <li class="flex items-center justify-between py-4 space-x-4">
              <PantryItem name="Banana" quantity="8/10" id="6" />
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
