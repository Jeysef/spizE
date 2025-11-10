import { LoaderCircle } from "lucide-solid";
import { Show } from "solid-js";
import { Button } from "~/components/ui/button";
import { useFormContext } from "~/hooks/form";

interface ButtonsProps {
  handleDelete: () => void;
}

export function Buttons(props: ButtonsProps) {
  const form = useFormContext();
  return (
    <>
      <Button type="button" variant="destructive" onClick={props.handleDelete}>
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
            <Button
              type="submit"
              disabled={!state().canSubmit}
              class="relative"
            >
              Submit
              <Show when={state().isSubmitting}>
                <div class="absolute inset-0 grid place-items-center bg-background/60">
                  <LoaderCircle class="h-4 w-4 animate-spin text-foreground" />
                </div>
              </Show>
            </Button>
          );
        }}
      </form.Subscribe>
    </>
  );
}
