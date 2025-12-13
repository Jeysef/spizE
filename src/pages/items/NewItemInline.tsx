import { createSignal } from "solid-js";
import { ChevronDown, Plus } from "lucide-solid";
import type {
    CategoryResponse,
    ItemResponse,
    UnitResponse,
    UserResponse,
} from "~/client";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { ItemInlineDetail } from "./ItemInlineDetail";

interface NewItemInlineProps {
    categories: CategoryResponse[] | undefined;
    units: UnitResponse[] | undefined;
    users: UserResponse[] | undefined;
    onCreate: (item: Partial<ItemResponse>) => Promise<void>;
}

export function NewItemInline(props: NewItemInlineProps) {
    const [isOpen, setIsOpen] = createSignal(false);
    const [name, setName] = createSignal("");
    const [categoryId, setCategoryId] = createSignal<number | undefined>();
    const [currentQuantity, setCurrentQuantity] = createSignal(0);
    const [fullQuantity, setFullQuantity] = createSignal(1);
    const [note, setNote] = createSignal("");
    const [unitId, setUnitId] = createSignal<number | undefined>();
    const [modifyBy, setModifyBy] = createSignal<number | undefined>();

    const handleCreate = async () => {
        if (!name()) return;

        await props.onCreate({
            name: name(),
            category_id: categoryId(),
            current_quantity: currentQuantity(),
            full_quantity: fullQuantity(),
            note: note(),
            unit_id: unitId(),
            modify_by: modifyBy(),
        });

        // Reset form
        setName("");
        setCategoryId(undefined);
        setCurrentQuantity(0);
        setFullQuantity(1);
        setNote("");
        setUnitId(undefined);
        setModifyBy(undefined);
        setIsOpen(false);
    };

    return (
        <Collapsible open={isOpen()} onOpenChange={setIsOpen}>
            {/* Header / Primary Helper Bar */}
            <div class="p-4 flex items-center gap-2">
                <Input
                    placeholder="Název nové položky..."
                    value={name()}
                    onInput={(e) => setName(e.currentTarget.value)}
                    class="flex-1"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleCreate();
                    }}
                />
                <Button onClick={handleCreate} disabled={!name()}>
                    <Plus class="size-4 mr-2" />
                    Přidat
                </Button>
                <CollapsibleTrigger
                    class={cn(buttonVariants({ variant: "outline", size: "icon" }))}
                >
                    <ChevronDown
                        class={cn(
                            "size-4 transition-transform",
                            isOpen() ? "rotate-0" : "rotate-180"
                        )}
                    />
                    <span class="sr-only">Toggle details</span>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
                <ItemInlineDetail
                    class="grid gap-4 py-4 border-b p-4"
                    name={name()}
                    categoryId={categoryId()}
                    categories={props.categories}
                    onCategoryChange={setCategoryId}

                    currentQuantity={currentQuantity()}
                    onCurrentQuantityInput={setCurrentQuantity}

                    fullQuantity={fullQuantity()}
                    onFullQuantityInput={setFullQuantity}

                    unitId={unitId()}
                    units={props.units}
                    onUnitChange={setUnitId}

                    modifyBy={modifyBy()}
                    onModifyByChange={setModifyBy}

                    note={note()}
                    onNoteChange={setNote}
                />
            </CollapsibleContent>
        </Collapsible>
    );
}
