import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { createForm, createFormControl, createInput } from "../Form/helpers";

// Passing on the client side the form config to this hook
export function useCreateFormController<T extends FieldValues>() {
  const methods = useForm<T>();
  const Form = React.useMemo(() => createForm<T>(methods), []);
  const InputControl = React.useMemo(() => createInput<T>(methods.control), []);
  const FormControl = React.useMemo(
    () => createFormControl<T>(methods.control, methods.register),
    []
  );

  // Exposing Components and methods
  return { Form, InputControl, FormControl, methods };
}
