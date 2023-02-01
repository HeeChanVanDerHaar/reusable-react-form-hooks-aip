import React from "react";
import { Control, UseFormRegister, UseFormReturn } from "react-hook-form";
import type { FieldValues, FieldPath } from "react-hook-form";
import type { InputControlProps } from "../Input/InputControl";
import { assertFC } from "../../types";
import { FormControl, FormControlBaseProps } from "./FormControl";
import InputControl from "../Input/InputControl";

type FormProps = {
  onValid: (data: object) => void;
  onInvalid: (data: object) => void;
  children: React.ReactElement | React.ReactElement[];
};

type FormControlProps<T extends FieldValues> = {
  children: React.ReactElement | React.ReactElement[];
  name: FieldPath<T>;
} & Partial<Omit<FormControlBaseProps<T>, "name">>;

export const createForm = <T extends FieldValues>(
  methods: UseFormReturn<T>
) => {
  function Form({
    children,
    onValid,
    onInvalid,
  }: FormProps): React.ReactElement | null {
    const { handleSubmit } = methods;

    return <form onSubmit={handleSubmit(onValid, onInvalid)}>{children}</form>;
  }
  assertFC(Form);

  return Form;
};

type InputControlFunc<TDataType extends FieldValues> = {
  name: FieldPath<TDataType>;
  rules?: any;
} & InputControlProps;

export const createInput =
  <T extends FieldValues>(control: Control<T>) =>
  ({ name, rules, fieldState, ...restProps }: InputControlFunc<T>) =>
    (
      <FormControl name={name} control={control} rules={rules}>
        <InputControl {...restProps} fieldState={fieldState} />
      </FormControl>
    );

export const createFormControl =
  <T extends FieldValues>(control: Control<T>, register: UseFormRegister<T>) =>
  ({ children, ...restProps }: FormControlProps<T>) =>
    (
      <FormControl control={control!} register={register!} {...restProps}>
        {children}
      </FormControl>
    );
