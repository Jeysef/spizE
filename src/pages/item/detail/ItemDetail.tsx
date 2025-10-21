import { createForm } from "@tanstack/solid-form";
import { Show } from "solid-js";
import { z } from "zod";
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
import type { Item } from "~/pages/item/types";

interface ItemDetailPageProps {
  item: Item;
  onSubmit?: (values: Item) => void;
  onError?: (error: Error) => void;
  handleDelete: () => void;
}

// ItemDetail component with integrated TanStack Form
export default function ItemDetailPage(props: ItemDetailPageProps) {
  const item = props.item;

  const form = createForm(() => ({
    // Set default values from our mock item data
    defaultValues: {
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      fullQuantity: item.fullQuantity,
    },
    // Define the onSubmit handler for when the form is successfully submitted
    onSubmit: async ({ value }) => {
      props.onSubmit?.(value);
    },

    // Use the Zod adapter for validation
    // validatorAdapter: zodValidator,
  }));

  return (
    <main class="container mx-auto max-w-2xl px-4 py-8">
      {/* A link to navigate back to the dashboard */}
      <a
        href="/"
        class="mb-4 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; Back to Dashboard
      </a>

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
                name="quantity"
                validators={{
                  // onChange: z.coerce
                  //   .number({ invalid_type_error: "Must be a number." })
                  //   .nonnegative("Quantity cannot be negative."),
                  onChange: ({ value }) =>
                    value > 0 ? "Quantity cannot be negative." : undefined,
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
                        field().handleChange(Number(e.currentTarget.value))
                      }
                    />
                    <Show when={field().state.meta.errors}>
                      <p class="text-sm text-destructive">
                        {field().state.meta.errors[0]}
                      </p>
                    </Show>
                  </div>
                )}
              </form.Field>

              {/* Target Quantity Field */}
              <form.Field
                name="fullQuantity"
                validators={{
                  onChange: ({ value }) =>
                    value > 0
                      ? "Target quantity must be greater than 0."
                      : undefined,
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
                        field().handleChange(Number(e.currentTarget.value))
                      }
                    />
                    <Show when={field().state.meta.errors}>
                      <p class="text-sm text-destructive">
                        {field().state.meta.errors[0]}
                      </p>
                    </Show>
                  </div>
                )}
              </form.Field>
            </div>

            {/* Stock Level Indicator */}
            <div class="grid gap-2">
              <Label>Stock Level</Label>
              <Progress
                value={
                  (form.state.values.quantity /
                    form.state.values.fullQuantity) *
                  100
                }
              />
              <p class="text-center text-sm text-muted-foreground">
                {`${form.state.values.quantity} / ${form.state.values.fullQuantity}`}
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
                  <button type="submit" disabled={!state().canSubmit}>
                    {state().isSubmitting ? "..." : "Submit"}
                  </button>
                );
              }}
            </form.Subscribe>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
