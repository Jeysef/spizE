import { A } from "@solidjs/router";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import { z } from "zod";
import type { CategoryResponse, ItemCreate, ItemResponse } from "~/client";
import { zItemCreate } from "~/client/zod.gen";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ProgressBar } from "~/pages/item/components/ProgressBar";
import { useAppForm } from "~/pages/item/detail/itemForm";

interface ItemDetailPageProps {
  item: ItemResponse;
  onSubmit?: (values: ItemCreate) => Promise<void>;
  onError?: (error: Error) => void;
  handleDelete: () => void;
  categories: CategoryResponse[];
}

// ItemDetail component with integrated TanStack Form
export default function ItemDetailPage(props: ItemDetailPageProps) {
  console.log("🚀 ~ ItemDetailPage ~ props.item:", props.item);
  console.log("🚀 ~ ItemDetailPage ~ props.categories:", props.categories);
  // const form = createForm(() => ({
  //   defaultValues: {
  //     name: props.item.name,
  //     current_quantity: props.item.current_quantity,
  //     full_quantity: props.item.full_quantity,
  //     category_id: props.item.category_id,
  //     note: props.item.note,
  //   } satisfies ItemCreate,
  //   onSubmit: async ({ value }) => {
  //     await props.onSubmit?.(value);
  //   },

  //   validators: {
  //     onSubmit: zItemCreate,
  //   },
  // }));

  const form = useAppForm(() => ({
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
            <form.AppField
              name="name"
              validators={{
                onChange: z
                  .string()
                  .min(2, "Item name must be at least 2 characters long."),
              }}
              children={(field) => <field.ItemName />}
            />

            {/* Fields for Quantity */}
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Current Quantity Field */}
              <form.AppField
                name="current_quantity"
                validators={{
                  onChange: z.number().min(0, "Quantity cannot be negative."),
                }}
                children={(field) => <field.ItemCount />}
              />

              {/* Target Quantity Field */}
              <form.AppField
                name="full_quantity"
                validators={{
                  onChange: z
                    .number()
                    .min(1, "Target quantity must be greater than 0."),
                }}
                children={(field) => <field.ItemCount />}
              />
            </div>

            {/* Category Field */}
            <form.AppField
              name="category_id"
              validators={{
                onChange: z.number().min(1, "Category ID must be at least 1."),
              }}
              children={(field) => (
                <field.CategorySelect categories={props.categories} />
              )}
            />

            {/* Stock Level Indicator */}
            <ProgressBar
              current_quantity={props.item.current_quantity}
              full_quantity={props.item.full_quantity}
            />
          </CardContent>
          <CardFooter class="flex justify-end gap-2">
            <form.AppForm>
              <form.Buttons handleDelete={props.handleDelete} />
            </form.AppForm>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
