import { createFormHook } from "@tanstack/solid-form";
import { fieldContext, formContext } from "~/hooks/form";
import { Buttons } from "~/pages/item/components/Buttons";
import { CategorySelect } from "~/pages/item/components/CategorySelect";
import { ItemCount } from "~/pages/item/components/ItemCount";
import { ItemName } from "~/pages/item/components/ItemName";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    CategorySelect,
    ItemCount,
    ItemName,
  },
  formComponents: {
    Buttons,
  },
  fieldContext,
  formContext,
});
