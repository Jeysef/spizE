import { Show } from "solid-js";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useFieldContext } from "~/hooks/form";
import { ErrorMessage } from "~/pages/item/components/ErrorMessge";

interface ItemCountProps {
  name: string;
}

export function ItemCount(props: ItemCountProps) {
  const field = useFieldContext<number>();
  return (
    <div class="grid gap-2">
      <Label for={field().name}>{props.name}</Label>
      <Input
        id={field().name}
        name={field().name}
        type="number"
        value={field().state.value}
        onBlur={field().handleBlur}
        onInput={(e) =>
          field().handleChange(parseInt(e.currentTarget.value.trim(), 10) || 0)
        }
      />
      <ErrorMessage />
    </div>
  );
}
