import { A } from "@solidjs/router";
import { For, Show } from "solid-js";
import type { ItemResponse, UnitResponse } from "~/client";
import { PantryItem } from "~/pages/low-stock/PantryItem";
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
import { cn } from "~/lib/utils";

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
  allUnits: UnitResponse[];
}

export default function Home(props: HomeProps) {
  return (
    <section class="p-4 sm:p-8 gap-6 flex flex-col justify-center items-center pb-32">
      <Heading variant={"h1"} class="text-3xl font-extrabold text-primary tracking-tight">
        Chybějící & Docházející položky
      </Heading>
      <div class="w-full max-w-5xl gap-6 flex flex-col md:flex-row items-stretch justify-center">
        <For each={props.cards}>
          {(items) => (
            <Card class="flex-1 transition-all duration-300 shadow-sm hover:shadow-md hover:border-primary/20 bg-card border-transparent">
              <CardHeader>
                <CardTitle class={cn("text-xl font-bold tracking-tight", items.color)}>{items.title}</CardTitle>
                <CardDescription>{items.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Show when={!props.loding} fallback={<p class="text-muted-foreground">Načítání...</p>}>
                  <ul class="flex flex-col gap-2">
                    <For
                      each={items.items}
                      fallback={
                        <Empty>
                          <EmptyContent>
                            <EmptyTitle class="text-muted-foreground font-medium">{items.emptyMsg}</EmptyTitle>
                          </EmptyContent>
                        </Empty>
                      }
                    >
                      {(item) => (
                        <li class="group flex items-center justify-between py-3 px-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <PantryItem
                            name={item.name}
                            quantity={item.current_quantity}
                            modify_by={item.modify_by}
                            fullQuantity={item.full_quantity}
                            id={item.id}
                            unit_name={props.allUnits?.find((unit) => unit.id === item.unit_id)?.name ?? ""}
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
