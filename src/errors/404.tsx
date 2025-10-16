import { A } from "@solidjs/router";
import ConstructionIcon from "lucide-solid/icons/Construction";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";

export default function NotFound() {
  return (
    <section class="flex grow">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ConstructionIcon />
          </EmptyMedia>
          <EmptyTitle>This page doesn't exist</EmptyTitle>
          <EmptyDescription>
            You might want to return to the home page
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          {/* <Button>Add data</Button> */}
          <A href="/" class={buttonVariants()}>
            Return to home
          </A>
        </EmptyContent>
      </Empty>
    </section>
  );
}
