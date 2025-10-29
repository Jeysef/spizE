import LoaderIcon from "lucide-solid/icons/loader";
import { ErrorBoundary, Suspense } from "solid-js";
import { ZodError } from "zod";
import { Button } from "~/components/ui/button";
import { Empty, EmptyHeader } from "~/components/ui/empty";
import { ItemDetailPageVM } from "~/pages/item/detail/ItemDetail.vm";

export function ItemDetailPageDataWrapper() {
  return (
    <ErrorBoundary
      fallback={(err: any, reset: () => void) => (
        <ErrorFallback error={err} reset={reset} />
      )}
    >
      <Suspense
        fallback={
          <Empty>
            <EmptyHeader>
              Loading...
              <LoaderIcon class="animate-spin" />
            </EmptyHeader>
          </Empty>
        }
      >
        <ItemDetailPageVM />
      </Suspense>
    </ErrorBoundary>
  );
}

function ErrorFallback(props: { error: Error; reset: () => void }) {
  const formatError = (error: Error) => {
    if (isZodError(error)) {
      return error.issues.map((issue) => issue.message).join(", ");
    }
    return error?.message;
  };
  return (
    <Empty>
      <EmptyHeader>
        Error
        <p>{formatError(props.error)}</p>
        <Button onClick={props.reset}>Try again</Button>
      </EmptyHeader>
    </Empty>
  );
}

function isZodError(error: Error): error is ZodError {
  return error instanceof ZodError;
}
