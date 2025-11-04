import { A } from "@solidjs/router";
import { createForm } from "@tanstack/solid-form";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import { Show } from "solid-js";
import { z } from "zod";
import type { CategoryResponse, ItemCreate, ItemResponse } from "~/client";
import { zItemCreate } from "~/client/zod.gen";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

interface ItemDetailPageProps {
  item: ItemResponse;
  onSubmit?: (values: ItemCreate) => Promise<void>;
  onError?: (error: Error) => void;
  handleDelete: () => void;
  categories: CategoryResponse[];
}

// ItemDetail component with integrated TanStack Form
export default function ItemDetailPage(props: ItemDetailPageProps) {
  const form = createForm(() => ({
    defaultValues: {
      name: props.item.name,
      current_quantity: props.item.current_quantity,
      full_quantity: props.item.full_quantity,
      category_id: props.item.category_id,
      note: props.item.note,
    } satisfies ItemCreate,
    onSubmit: async ({ value }) => {
      await props.onSubmit?.(value);
    },

    validators: {
      onSubmit: zItemCreate,
    },
  }));

  return (
    <main class="container mx-auto max-w-2xl px-4 py-8">
      <A
        href="/"
        class="mb-4 inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground items-center"
      >
        <ChevronLeft class="size-5" /> Back to Dashboard
      </A>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle class="text-3xl font-bold tracking-tight">
              {props.item.name}
            </CardTitle>
            <CardDescription>
              View and edit the details of this pantry item.
            </CardDescription>
          </CardHeader>
          <CardContent class="grid gap-6">
            {/* Field for Item Name */}
            <form.Field
              name="name"
              validators={{
                onChange: z
                  .string()
                  .min(2, "Item name must be at least 2 characters long."),
              }}
            >
              {(field) => (
                <div class="grid gap-2">
                  <Label for={field().name}>Item Name</Label>
                  <Input
                    id={field().name}
                    name={field().name}
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onInput={(e) => field().handleChange(e.currentTarget.value)}
                    placeholder="e.g., Whole Wheat Bread"
                  />
                  <Show when={!field().state.meta.isValid}>
                    {/* <p class="text-sm text-destructive"> */}
                    <em role="alert">{field().state.meta.errors.join(", ")}</em>
                    {/* </p> */}
                  </Show>
                </div>
              )}
            </form.Field>

            {/* Fields for Quantity */}
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Current Quantity Field */}
              <form.Field
                name="current_quantity"
                validators={{
                  onChange: z.number().min(0, "Quantity cannot be negative."),
                }}
              >
                {(field) => (
                  <div class="grid gap-2">
                    <Label for={field().name}>Current Quantity</Label>
                    <Input
                      id={field().name}
                      name={field().name}
                      type="number"
                      value={field().state.value}
                      onBlur={field().handleBlur}
                      onInput={(e) =>
                        field().handleChange(
                          parseInt(e.currentTarget.value.trim())
                        )
                      }
                    />
                    <Show when={field().state.meta.errors}>
                      <p class="text-sm text-destructive">
                        {field()
                          .state.meta.errors.map((error) => error?.message)
                          .join(", ")}
                      </p>
                    </Show>
                  </div>
                )}
              </form.Field>

              {/* Target Quantity Field */}
              <form.Field
                name="full_quantity"
                validators={{
                  onChange: z
                    .number()
                    .min(1, "Target quantity must be greater than 0."),
                }}
              >
                {(field) => (
                  <div class="grid gap-2">
                    <Label for={field().name}>Target Quantity</Label>
                    <Input
                      id={field().name}
                      name={field().name}
                      type="number"
                      value={field().state.value}
                      onBlur={field().handleBlur}
                      onInput={(e) =>
                        field().handleChange(
                          Number(e.currentTarget.value.trim())
                        )
                      }
                    />
                    <Show when={field().state.meta.errors}>
                      <p class="text-sm text-destructive">
                        {field()
                          .state.meta.errors.map((error) => error?.message)
                          .join(", ")}
                      </p>
                    </Show>
                  </div>
                )}
              </form.Field>
            </div>

            {/* Category Field */}
            <form.Field
              name="category_id"
              validators={{
                onChange: z
                  .number()
                  .min(1, "Category ID must be at least 1.")
                  .max(
                    props.categories.length,
                    "Category ID must be less than the number of categories."
                  ),
              }}
            >
              {(field) => (
                <div class="grid gap-2">
                  <Label for={field().name}>Category</Label>
                  <Select
                    value={{
                      value: field().state.value,
                      label: props.categories.find(
                        (category) => category.id === field().state.value
                      )?.name,
                    }}
                    placeholder="Select a category"
                    onBlur={field().handleBlur}
                    onChange={(value) =>
                      value && field().handleChange(value.value)
                    }
                    options={props.categories.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                    optionValue="value"
                    optionTextValue="label"
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>
                        {props.item.rawValue.label}
                      </SelectItem>
                    )}
                  >
                    <SelectTrigger aria-label="Fruit" class="w-[180px]">
                      <SelectValue<{
                        value: number;
                        label: string;
                      }>>
                        {(state) => state.selectedOption().label}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                  <Show when={field().state.meta.errors.length > 0}>
                    <p class="text-sm text-destructive">
                      {field().state.meta.errors.join(", ")}
                    </p>
                  </Show>
                </div>
              )}
            </form.Field>

            {/* Stock Level Indicator */}
            <div class="grid gap-2">
              <Label>Stock Level</Label>
              <Progress
                value={
                  (props.item.current_quantity / props.item.full_quantity) * 100
                }
              />
              <p class="text-center text-sm text-muted-foreground">
                {`${props.item.current_quantity} / ${props.item.full_quantity}`}
              </p>
            </div>
          </CardContent>
          <CardFooter class="flex justify-end gap-2">
            <Button
              type="button"
              variant="destructive"
              onClick={props.handleDelete}
            >
              Delete
            </Button>
            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
              })}
            >
              {(state) => {
                return (
                  <Button type="submit" disabled={!state().canSubmit}>
                    {state().isSubmitting ? "..." : "Submit"}
                  </Button>
                );
              }}
            </form.Subscribe>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
