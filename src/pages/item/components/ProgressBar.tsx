import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";

interface ProgressBarProps {
  current_quantity: number;
  full_quantity: number;
}
export function ProgressBar(props: ProgressBarProps) {
  return (
    <div class="grid gap-2">
      <Label>Stock Level</Label>
      <Progress value={(props.current_quantity / props.full_quantity) * 100} />
      <p class="text-center text-sm text-muted-foreground">
        {`${props.current_quantity} / ${props.full_quantity}`}
      </p>
    </div>
  );
}
