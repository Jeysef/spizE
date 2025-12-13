import { Component, Show } from "solid-js";
import { Minus, Plus } from "lucide-solid";
import type {
    CategoryResponse,
    UnitResponse,
} from "~/client";
import { Button } from "~/components/ui/button";
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

interface ItemInlineDetailProps {
    // Fields
    name: string;
    onNameChange?: (v: string) => void;
    onNameInput?: (v: string) => void;

    categoryId: number | undefined;
    onCategoryChange: (v: number) => void;

    currentQuantity: number;
    onCurrentQuantityChange?: (v: number) => void;
    onCurrentQuantityInput?: (v: number) => void;

    fullQuantity: number;
    onFullQuantityChange?: (v: number) => void;
    onFullQuantityInput?: (v: number) => void;

    unitId: number | undefined;
    onUnitChange: (v: number) => void;

    modifyBy: number | undefined;
    onModifyByChange?: (v: number) => void;

    note: string;
    onNoteChange: (v: string) => void;

    // Configuration
    categories: CategoryResponse[] | undefined;
    units: UnitResponse[] | undefined;
    showProgress?: boolean;
    onDelete?: () => void;
    class?: string;
}

export const ItemInlineDetail: Component<ItemInlineDetailProps> = (props) => {
    const progress = () => {
        if (props.fullQuantity === 0) return 100;
        return (props.currentQuantity / props.fullQuantity) * 100;
    };

    return (
        <div class={props.class}>
            {/* Name Field - Optional if we want to show it here */}
            <Show when={props.onNameChange || props.onNameInput}>
                <div class="grid gap-2">
                    <Label>Jméno</Label>
                    <Input
                        value={props.name}
                        onBlur={(e) => props.onNameChange?.(e.target.value)}
                        onInput={(e) => props.onNameInput?.(e.target.value)}
                    />
                </div>
            </Show>

            {/* Category Field */}
            <div class="grid gap-2">
                <Label>Kategorie</Label>
                <Select
                    value={props.categories?.find((c) => c.id === props.categoryId)}
                    onChange={(value) => value && props.onCategoryChange(value.id)}
                    options={props.categories || []}
                    optionValue="id"
                    optionTextValue="name"
                    placeholder="Select a category"
                    itemComponent={(props) => (
                        <SelectItem item={props.item}>{props.item.rawValue.name}</SelectItem>
                    )}
                >
                    <SelectTrigger>
                        <SelectValue<CategoryResponse>>
                            {(state) => state.selectedOption()?.name}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                </Select>
            </div>

            {/* Quantities */}
            <div class="grid gap-4">
                <div class="grid grid-cols-[1fr_auto] gap-2 items-end">
                    <div class="grid gap-2">
                        <Label>Aktuální množství</Label>
                        <Input
                            type="number"
                            min={0}
                            value={props.currentQuantity}
                            onBlur={(e) =>
                                props.onCurrentQuantityChange?.(Number(e.target.value))
                            }
                            onInput={(e) =>
                                props.onCurrentQuantityInput?.(Number(e.target.value))
                            }
                        />
                    </div>
                    <div class="flex gap-1">
                        <Button
                            variant="secondary"
                            size="icon"
                            class="min-w-9 px-3 rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium border-0"
                            onClick={() => {
                                const step = props.modifyBy || 1;
                                const newVal = Math.max(0, props.currentQuantity - step);
                                if (props.onCurrentQuantityChange) props.onCurrentQuantityChange(newVal);
                                else if (props.onCurrentQuantityInput) props.onCurrentQuantityInput(newVal);
                            }}
                        >
                            <Minus class="size-4" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            class="min-w-9 px-3 rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium border-0"
                            onClick={() => {
                                const step = props.modifyBy || 1;
                                const newVal = props.currentQuantity + step;
                                if (props.onCurrentQuantityChange) props.onCurrentQuantityChange(newVal);
                                else if (props.onCurrentQuantityInput) props.onCurrentQuantityInput(newVal);
                            }}
                        >
                            <Plus class="size-4" />
                        </Button>
                    </div>
                </div>

                <div class="grid grid-cols-[1fr_auto] gap-2 items-end">
                    <div class="grid gap-2">
                        <Label>Cílové množství</Label>
                        <Input
                            type="number"
                            min={1}
                            value={props.fullQuantity}
                            onBlur={(e) =>
                                props.onFullQuantityChange?.(Number(e.target.value))
                            }
                            onInput={(e) =>
                                props.onFullQuantityInput?.(Number(e.target.value))
                            }
                        />
                    </div>
                    <div class="flex gap-1">
                        <Button
                            variant="secondary"
                            size="icon"
                            class="min-w-9 px-3 rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium border-0"
                            onClick={() => {
                                const step = props.modifyBy || 1;
                                const newVal = Math.max(1, props.fullQuantity - step);
                                if (props.onFullQuantityChange) props.onFullQuantityChange(newVal);
                                else if (props.onFullQuantityInput) props.onFullQuantityInput(newVal);
                            }}
                        >
                            <Minus class="size-4" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            class="min-w-9 px-3 rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium border-0"
                            onClick={() => {
                                const step = props.modifyBy || 1;
                                const newVal = props.fullQuantity + step;
                                if (props.onFullQuantityChange) props.onFullQuantityChange(newVal);
                                else if (props.onFullQuantityInput) props.onFullQuantityInput(newVal);
                            }}
                        >
                            <Plus class="size-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Unit & Modify By */}
            <div class="grid grid-cols-2 gap-4">
                {/* Unit Field */}
                <div class="grid gap-2">
                    <Label>Jednotka</Label>
                    <Select
                        value={props.units?.find((u) => u.id === props.unitId)}
                        onChange={(value) => value && props.onUnitChange(value.id)}
                        options={props.units || []}
                        optionValue="id"
                        optionTextValue="name"
                        placeholder="Select"
                        itemComponent={(props) => (
                            <SelectItem item={props.item}>{props.item.rawValue.name}</SelectItem>
                        )}
                    >
                        <SelectTrigger>
                            <SelectValue<UnitResponse>>
                                {(state) => state.selectedOption()?.name}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent />
                    </Select>
                </div>

                {/* Modify By Field */}
                <Show when={props.onModifyByChange}>
                    <div class="grid gap-2">
                        <Label>Modifikace o</Label>
                        <Input
                            type="number"
                            min={1}
                            step={1}
                            // defaultValue={props.modifyBy || "1"}
                            value={(() => {
                                const num = props.modifyBy;
                                if (num === undefined || isNaN(num) || num <= 0) {
                                    return 1;
                                }
                                return parseFloat(num.toFixed(3));
                            })()}
                            onInput={(e) =>
                                props.onModifyByChange?.(
                                    (() => {
                                        const num = Number(e.target.value);
                                        if (isNaN(num) || num <= 0) {
                                            return props.modifyBy || 1;
                                        }
                                        return parseFloat(num.toFixed(3));
                                    })()
                                )
                            }
                        />
                    </div>
                </Show>
            </div>

            {/* Note */}
            <div class="grid gap-2">
                <Label>Poznámka</Label>
                <TextField value={props.note || ""} onChange={props.onNoteChange}>
                    <TextFieldTextArea
                        autoResize
                        class="min-h-[60px]"
                        placeholder="Poznámka..."
                    />
                </TextField>
            </div>

            {/* Progress Bar */}
            <Show when={props.showProgress}>
                <div class="space-y-2 pt-2">
                    <div class="flex justify-between text-sm">
                        <Label>Stav</Label>
                        <span class="text-muted-foreground">
                            {props.currentQuantity} / {props.fullQuantity}
                        </span>
                    </div>
                    <Progress value={progress()} />
                </div>
            </Show>

            {/* Delete Button */}
            <Show when={props.onDelete}>
                <Button variant="destructive" onClick={props.onDelete}>
                    Vymazat
                </Button>
            </Show>
        </div>
    );
};
