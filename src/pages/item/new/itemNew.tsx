import { A } from "@solidjs/router";
import { createForm } from "@tanstack/solid-form";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import { Show } from "solid-js";
import { z } from "zod";
import type { ItemCreate } from "~/client";
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
import { TextField, TextFieldInput } from "~/components/ui/text-field";

interface ItemNewPageProps {
  onSubmit?: (values: ItemCreate) => Promise<void>;
  onError?: (error: Error) => void;
}

export default function ItemNewPage(props: ItemNewPageProps) {
  const form = createForm(() => ({
    defaultValues: {
      name: "",
      current_quantity: 0,
      full_quantity: 1,
      category_id: -1,
      note: "",
    },
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
        class="mb-4 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
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
              Add New Pantry Item
            </CardTitle>
            <CardDescription>
              Fill in the details to add a new item to your pantry.
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
                    placeholder="e.g., All-Purpose Flour"
                  />
                  <Show when={field().state.meta.errors.length > 0}>
                    <p class="text-sm text-destructive">
                      {field().state.meta.errors.join(", ")}
                    </p>
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
                          parseInt(e.currentTarget.value.trim(), 10) || 0
                        )
                      }
                    />
                    <Show when={field().state.meta.errors.length > 0}>
                      <p class="text-sm text-destructive">
                        {field().state.meta.errors.join(", ")}
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
                    .min(1, "Target quantity must be at least 1."),
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
                          parseInt(e.currentTarget.value.trim(), 10) || 1
                        )
                      }
                    />
                    <Show when={field().state.meta.errors.length > 0}>
                      <p class="text-sm text-destructive">
                        {field().state.meta.errors.join(", ")}
                      </p>
                    </Show>
                  </div>
                )}
              </form.Field>
            </div>
            {/* Field for Note */}
            <form.Field name="note">
              {(field) => (
                <div class="grid gap-2">
                  <Label for={field().name}>Note (Optional)</Label>
                  <TextField>
                    <TextFieldInput
                      id={field().name}
                      name={field().name}
                      value={field().state.value ?? ""}
                      onBlur={field().handleBlur}
                      onInput={(e) =>
                        field().handleChange(e.currentTarget.value)
                      }
                      placeholder="e.g., Brand, expiration date, etc."
                    />
                  </TextField>
                </div>
              )}
            </form.Field>
          </CardContent>
          <CardFooter class="flex justify-end gap-2">
            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
              })}
            >
              {(state) => (
                <Button type="submit" disabled={!state().canSubmit}>
                  {state().isSubmitting ? "Adding..." : "Add Item"}
                </Button>
              )}
            </form.Subscribe>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
