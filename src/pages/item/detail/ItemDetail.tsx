import { A, useNavigate } from "@solidjs/router";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import { z } from "zod";
import type { CategoryResponse, ItemCreate, ItemResponse, UnitResponse } from "~/client";
import { zItemCreate } from "~/client/zod.gen";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ItemInlineDetail } from "~/pages/items/ItemInlineDetail";
import { useAppForm } from "~/pages/item/detail/itemForm";

interface ItemDetailPageProps {
  item: ItemResponse;
  onSubmit: (values: ItemCreate) => Promise<void>;
  onError?: (error: Error) => void;
  handleDelete: () => void;
  categories: CategoryResponse[];
  units: UnitResponse[];
}

// ItemDetail component with integrated TanStack Form
// Define a schema that includes modify_by since it's missing in zItemCreate
const zAppItemCreate = zItemCreate.extend({
  modify_by: z.number().optional(),
});

type AppItemCreate = z.infer<typeof zAppItemCreate>;

export default function ItemDetailPage(props: ItemDetailPageProps) {
  // const navigate = useNavigate();
  const form = useAppForm(() => ({
    defaultValues: {
      name: props.item.name,
      current_quantity: props.item.current_quantity,
      full_quantity: props.item.full_quantity,
      category_id: props.item.category_id,
      note: props.item.note,
      unit_id: props.item.unit_id,
      modify_by: props.item.modify_by ?? 1,
    } as AppItemCreate,
    onSubmit: async ({ value }) => {
      // We need to cast value to match what onSubmit expects if it's strictly typed, 
      // but strictly speaking value here includes modify_by which is good for the patch.
      // The prop onSubmit expects ItemCreate. We might need to cast or just pass it 
      // if TypeScript allows structural typing (it might complain about extra property).
      await props.onSubmit(value as unknown as ItemCreate);
      // navigate back
      window.history.back();
    },

    validators: {
      onSubmit: zAppItemCreate,
    },
  }));

  return (
    <main class="container mx-auto max-w-2xl px-4 py-8">
      {/* <A
        href="/"
        class="mb-4 inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground items-center"
      >
        <ChevronLeft class="size-5" /> Zpět na seznam
      </A> */}
      <button
        class="mb-4 inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground items-center cursor-pointer"
        onClick={() => window.history.back()}
      >
        <ChevronLeft class="size-5" /> Zpět na seznam
      </button>

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
              Detail a úprava položky.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form.Subscribe
              selector={(state) => state.values}
              children={(values) => (
                <ItemInlineDetail
                  // Fields
                  name={values().name}
                  onNameChange={(v) => form.setFieldValue("name", v)}
                  onNameInput={(v) => form.setFieldValue("name", v)}

                  categoryId={values().category_id}
                  onCategoryChange={(v) => form.setFieldValue("category_id", v)}

                  currentQuantity={values().current_quantity}
                  onCurrentQuantityChange={(v) => form.setFieldValue("current_quantity", v)}
                  onCurrentQuantityInput={(v) => form.setFieldValue("current_quantity", v)}

                  fullQuantity={values().full_quantity}
                  onFullQuantityChange={(v) => form.setFieldValue("full_quantity", v)}
                  onFullQuantityInput={(v) => form.setFieldValue("full_quantity", v)}

                  unitId={values().unit_id}
                  onUnitChange={(v) => form.setFieldValue("unit_id", v)}

                  modifyBy={values().modify_by}
                  onModifyByChange={(v) => form.setFieldValue("modify_by", v)}

                  note={values().note}
                  onNoteChange={(v) => form.setFieldValue("note", v)}

                  // Configuration
                  categories={props.categories}
                  units={props.units}
                  showProgress={true}
                  // onDelete={props.handleDelete}
                  class=" space-y-2"
                />
              )}
            />

            {/* <div class="mt-6 flex justify-end gap-2">
              <form.Subscribe
                selector={(state) => ({
                  canSubmit: state.canSubmit,
                  isSubmitting: state.isSubmitting,
                })}
                children={(state) => (
                  <Button
                    type="submit"
                    disabled={!state().canSubmit}
                  >
                    {state().isSubmitting ? "Ukládání..." : "Uložit"}
                  </Button>
                )}
              />
          </div> */}
          </CardContent>
          <CardFooter class="flex justify-end gap-2">
            <form.AppForm>
              <form.Buttons handleDelete={props.handleDelete} />
            </form.AppForm>
          </CardFooter>
        </Card>
      </form>
    </main >
  );
}
