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
            <Button type="submit" disabled={!state().canSubmit}>
              {state().isSubmitting ? "..." : "Submit"}
            </Button>
          );
        }}
      </form.Subscribe>
    </>
  );
}
