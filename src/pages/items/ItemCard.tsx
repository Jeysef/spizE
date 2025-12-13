import { A } from "@solidjs/router";
import { ChevronDown } from "lucide-solid";
import ChevronRight from "lucide-solid/icons/chevron-right";
import Minus from "lucide-solid/icons/minus";
import { For, Show } from "solid-js";
import type {
  CategoryResponse,
  ItemResponse,
  UnitResponse,
  UserResponse,
} from "~/client";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { TextField, TextFieldTextArea } from "~/components/ui/text-field";
import { cn } from "~/lib/utils";
import { ItemInlineDetail } from "./ItemInlineDetail";

interface ItemCardProps {
  item: ItemResponse;
  allCategories: CategoryResponse[] | undefined;
  allUnits: UnitResponse[] | undefined;
  allUsers: UserResponse[] | undefined;
  onUpdate: (id: number, changes: Partial<ItemResponse>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

// Reusable component for displaying a single item in the list
export function ItemCard(props: ItemCardProps) {
  const progress = () => {
    if (props.item.full_quantity === 0) return 100; // Fully stocked if target is 0
    return (props.item.current_quantity / props.item.full_quantity) * 100;
  };

  return (
    <Collapsible>
      <Card class="flex flex-col justify-between transition-shadow hover:shadow-md">
        <CollapsibleTrigger class="w-full text-left">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 p-4 pl-6">
            <CardTitle class="text-lg font-semibold">
              {props.item.name}
            </CardTitle>
            <div class="flex items-center gap-2">
              <span class="text-muted-foreground">
                {`${props.item.current_quantity} ${props.allUnits?.find((unit) => unit.id === props.item.unit_id)?.name} / ${props.item.full_quantity} ${props.allUnits?.find((unit) => unit.id === props.item.unit_id)?.name}`}
              </span>
              <Button
                variant="outline"
                size="icon"
                class="size-8 shrink-0"
                disabled={props.item.current_quantity <= 0}
                onClick={(e) => {
                  e.stopPropagation();
                  props.onUpdate(props.item.id, {
                    current_quantity: Math.max(
                      0,
                      props.item.current_quantity - (props.item.modify_by ?? 1)
                    ),
                  });
                }}
              >
                <Minus class="size-4" />
                <span class="sr-only">Subtract one</span>
              </Button>
              <ChevronDown class="size-4 transition-transform ui-expanded:rotate-90" />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ItemInlineDetail
            class="grid gap-4 py-4 p-4"
            // Name
            name={props.item.name}
            onNameChange={(val) => props.onUpdate(props.item.id, { name: val })}
            // Category
            categoryId={props.item.category_id}
            categories={props.allCategories}
            onCategoryChange={(val) =>
              props.onUpdate(props.item.id, { category_id: val })
            }
            // Quantities
            currentQuantity={props.item.current_quantity}
            onCurrentQuantityChange={(val) =>
              props.onUpdate(props.item.id, { current_quantity: val })
            }
            fullQuantity={props.item.full_quantity}
            onFullQuantityChange={(val) =>
              props.onUpdate(props.item.id, { full_quantity: val })
            }
            // Unit
            unitId={props.item.unit_id}
            units={props.allUnits}
            onUnitChange={(val) =>
              props.onUpdate(props.item.id, { unit_id: val })
            }
            // Modify By
            modifyBy={props.item.modify_by}
            onModifyByChange={(val) =>
              props.onUpdate(props.item.id, { modify_by: val })
            }
            // Note
            note={props.item.note}
            onNoteChange={(val) => props.onUpdate(props.item.id, { note: val })}
            // Extras
            showProgress
            onDelete={() => props.onDelete(props.item.id)}
          />
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
