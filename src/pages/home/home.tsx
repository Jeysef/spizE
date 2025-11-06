import { A } from "@solidjs/router";
import { For, Show } from "solid-js";
import type { ItemResponse } from "~/client";
import { PantryItem } from "~/pages/home/PantryItem";
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

interface CardProps {
  title: string;
  description: string;
  items: ItemResponse[];
  emptyMsg: string;
  color: string;
}

interface HomeProps {
  cards: CardProps[];
  loding: boolean;
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
        <For each={props.cards}>
          {(items) => (
            <Card class="basis-80 shrink">
              <CardHeader>
                <CardTitle class={items.color}>{items.title}</CardTitle>
                <CardDescription>{items.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Show when={!props.loding} fallback={<p>Loading...</p>}>
                  <ul class="divide-y divide-gray-200">
                    <For
                      each={items.items}
                      fallback={
                        <Empty>
                          <EmptyContent>
                            <EmptyTitle>{items.emptyMsg}</EmptyTitle>
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
                </Show>
              </CardContent>
            </Card>
          )}
        </For>
      </div>
    </section>
  );
}
