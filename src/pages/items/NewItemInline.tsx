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
        <div class="fixed bottom-16 left-0 right-0 z-50 p-4 pointer-events-none">
            <div class="container mx-auto pointer-events-auto">
                <Collapsible open={isOpen()} onOpenChange={setIsOpen}>
                    <Card class="flex flex-col-reverse shadow-xl border-t">
                        {/* Header / Primary Helper Bar */}
                        <div class="p-4 flex items-center gap-2 bg-card">
                            <Input
                                placeholder="New item name..."
                                value={name()}
                                onInput={(e) => setName(e.currentTarget.value)}
                                class="flex-1"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleCreate();
                                }}
                            />
                            <Button onClick={handleCreate} disabled={!name()}>
                                <Plus class="size-4 mr-2" />
                                Create
                            </Button>
                            <CollapsibleTrigger
                                class={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
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

                        {/* Expanded Content */}
                        <CollapsibleContent>
                            <ItemInlineDetail
                                class="grid gap-4 py-4 border-b p-4"
                                // Name - already in header, but user requested reusing component which optionally has name.
                                // If we don't pass onNameChange/Input, it hides.
                                // Or we can pass it if we want it editable there too?
                                // Let's hide it assuming header is enough.
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
                    </Card>
                </Collapsible>
            </div>
        </div>
    );
}
