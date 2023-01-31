import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { FieldValues, FieldPath } from "react-hook-form";

import InputController from "../Input/InputController";
import type { InputControllerProps } from "../Input/InputController";

import FormController from "./FormController";
import type { FormControllerProps } from "./FormController";

import { assertFC } from "../../types";
import { ValueHolder } from "../../types/values";

type InputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
} & InputControllerProps;

type ControllerProps<T> = {
  label?: string;
} & Pick<ValueHolder<T>, "name"> &
  FormControllerProps;

type InputType<T extends FieldValues> = React.ReactElement<InputProps<T>>;

type ControllerType<T> = React.ReactElement<ControllerProps<T>>;

interface FormProps<T extends FieldValues> {
  data?: Array<T>;
  onValid: (data: object) => void;
  onInvalid: (data: object) => void;
  children?:
    | InputType<T>[]
    | InputType<T>
    | ControllerType<T>
    | ControllerType<T>[];
}

export const createForm = <T extends unknown>() => {
  function Form<T extends FieldValues>({
    children,
    onValid,
    onInvalid,
  }: FormProps<T>): React.ReactElement | null {
    const methods = useForm<T>({
      defaultValues: { testText: "ksdjfh" } as any,
    });

    const { handleSubmit } = methods;

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>{children}</form>
      </FormProvider>
    );
  }
  assertFC(Form);

  return Form;
};

export const createInput =
  <T extends FieldValues>() =>
  (props: InputProps<T>) =>
    <InputController {...props} />;

export const createController =
  <T extends unknown>() =>
  (props: ControllerProps<T> & { Component: React.FC<any> }) =>
    <FormController {...props} />;
