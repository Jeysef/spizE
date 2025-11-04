import type { CategoryResponse } from "~/client";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useFieldContext } from "~/hooks/form";
import { ErrorMessage } from "~/pages/item/components/ErrorMessge";

interface CategorySelectProps {
  categories: CategoryResponse[];
}

export function CategorySelect(props: CategorySelectProps) {
  const field = useFieldContext<number>();
  return (
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
        onChange={(value) => value && field().handleChange(value.value)}
        options={props.categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        optionValue="value"
        optionTextValue="label"
        itemComponent={(props) => (
          <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
        )}
      >
        <SelectTrigger aria-label="Fruit" class="w-[180px]">
          <SelectValue<{
            value: number;
            label: string;
          }>>
            {(state) => state.selectedOption()?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent />
      </Select>
      <ErrorMessage />
    </div>
  );
}
