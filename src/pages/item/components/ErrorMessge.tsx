import { Show } from "solid-js";
import { useFieldContext } from "~/hooks/form";

export function ErrorMessage() {
  const field = useFieldContext<unknown>();
  return (
    <Show when={field().state.meta.errors.length > 0}>
      <em role="alert" class="text-sm text-destructive">
        {field()
          .state.meta.errors.map((error) => error?.message)
          .join(", ")}
      </em>
    </Show>
  );
}
