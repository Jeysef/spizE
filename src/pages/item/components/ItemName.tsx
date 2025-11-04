import { createUniqueId, Show } from "solid-js";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useFieldContext } from "~/hooks/form";
import { ErrorMessage } from "~/pages/item/components/ErrorMessge";

export function ItemName() {
  const field = useFieldContext<string>();
  const id = createUniqueId();
  return (
    <div class="grid gap-2">
      <Label for={id}>Item Name</Label>
      <Input
        id={id}
        name={field().name}
        value={field().state.value}
        onBlur={field().handleBlur}
        onInput={(e) => field().handleChange(e.currentTarget.value)}
        placeholder="e.g., Whole Wheat Bread"
      />
      <ErrorMessage />
    </div>
  );
}
