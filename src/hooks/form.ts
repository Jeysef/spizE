import { createFormHookContexts } from "@tanstack/solid-form";

// Create the context providers and consumer hooks.
// We pass the form's value type here for better type inference.
export const { formContext, useFormContext, fieldContext, useFieldContext } =
  createFormHookContexts();
