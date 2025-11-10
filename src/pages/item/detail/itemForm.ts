import { createFormHook } from "@tanstack/solid-form";
import { fieldContext, formContext } from "~/hooks/form";
import { Buttons } from "~/pages/item/components/Buttons";
import { CategorySelect } from "~/pages/item/components/CategorySelect";
import { ItemCount } from "~/pages/item/components/ItemCount";
import { ItemName } from "~/pages/item/components/ItemName";
import { ItemNote } from "~/pages/item/components/ItemNote";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    CategorySelect,
    ItemCount,
    ItemName,
    ItemNote,
  },
  formComponents: {
    Buttons,
  },
  fieldContext,
  formContext,
});
