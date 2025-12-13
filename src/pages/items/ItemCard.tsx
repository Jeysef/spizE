import { A } from "@solidjs/router";
import { ChevronDown } from "lucide-solid";
import ChevronRight from "lucide-solid/icons/chevron-right";
import Minus from "lucide-solid/icons/minus";
import { For, Show, createSignal } from "solid-js";
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
  opened: boolean;
  onOpenChange: (open: boolean) => void;
}

// Reusable component for displaying a single item in the list
export function ItemCard(props: ItemCardProps) {
  const [isEditingName, setIsEditingName] = createSignal(false);
  const [editNameValue, setEditNameValue] = createSignal("");

  const progress = () => {
    if (props.item.full_quantity === 0) return 100; // Fully stocked if target is 0
    return (props.item.current_quantity / props.item.full_quantity) * 100;
  };

  return (
    <Collapsible open={props.opened} onOpenChange={props.onOpenChange}>
      <Card class="flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md hover:border-primary/20 bg-card border-transparent">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 p-4 pl-6">

          <CardTitle class="text-xl font-bold flex items-center min-h-[40px] tracking-tight">
            <Show
              when={isEditingName()}
              fallback={
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setEditNameValue(props.item.name);
                    setIsEditingName(true);
                  }}
                  class="cursor-pointer hover:underline hover:decoration-dashed decoration-muted-foreground/50 underline-offset-4"
                >
                  {props.item.name}
                </span>
              }
            >
              <Input
                value={editNameValue()}
                onInput={(e) => setEditNameValue(e.currentTarget.value)}
                onBlur={() => {
                  if (editNameValue().trim() !== props.item.name) {
                    props.onUpdate(props.item.id, { name: editNameValue() });
                  }
                  setIsEditingName(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (editNameValue().trim() !== props.item.name) {
                      props.onUpdate(props.item.id, { name: editNameValue() });
                    }
                    setIsEditingName(false);
                  }
                  if (e.key === "Escape") {
                    setIsEditingName(false);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                class="h-9 text-xl font-semibold px-2 py-0 w-full max-w-[300px]"
                ref={(el) => setTimeout(() => el.focus(), 0)}
              />
            </Show>
          </CardTitle>
          <div class="flex items-center gap-4">
            <span class="text-muted-foreground">
              {`${props.item.current_quantity} ${props.allUnits?.find((unit) => unit.id === props.item.unit_id)?.name} / ${props.item.full_quantity} ${props.allUnits?.find((unit) => unit.id === props.item.unit_id)?.name}`}
            </span>
            <Button
              variant="secondary"
              size="sm"
              class="h-9 min-w-9 px-3 rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium border-0"
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
              - {props.item.modify_by ?? 1}
              <span class="sr-only">Odebrat 1</span>
            </Button>
            <CollapsibleTrigger class="contents">
              <Button
                variant="ghost"
                size="icon"
                class="size-9 shrink-0 rounded-full hover:bg-muted text-muted-foreground"
              >
                <ChevronDown class="size-4 transition-transform ui-expanded:rotate-90" />
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
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
            // showProgress
            onDelete={() => props.onDelete(props.item.id)}
          />
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
