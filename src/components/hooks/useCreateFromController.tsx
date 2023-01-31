import React from "react";
import type { FieldValues } from "react-hook-form";
import { createController, createForm, createInput } from "../Form/helpers";

export function useCreateFormController<T extends FieldValues>() {
  const Form = React.useMemo(() => createForm<T>(), []);
  const Input = React.useMemo(() => createInput<T>(), []);
  const Controller = React.useMemo(() => createController<T>(), []);

  return { Form, Input, Controller };
}
