import { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { assertFC } from "../../types";
import InputController from "../Input/InputController";
import type { InputControllerProps } from "../Input/InputController";

import { FormElement } from "./FormStyles";
import ConnectForm from "../ConnectForm";

type Values<T> = T[keyof T];

type ValueHolder<T> = Values<{
  [Prop in keyof T & string]: {
    name: Prop;
    type: T[Prop] extends string
      ? "text"
      : T[Prop] extends number
      ? "number"
      : T[Prop] extends boolean
      ? "checkbox" | "radio"
      : never;
    value?: T[Prop];
  };
}>;

type InputProps_<T> = {
  label?: string;
} & ValueHolder<T> &
  InputControllerProps;

type InputType<T> = React.ReactElement<InputProps_<T>>;

interface FormProps<T> {
  data?: Array<T>;
  onValid: (data: object) => void;
  onInvalid: (data: object) => void;
  children?: InputType<T>[] | InputType<T>;
}

export const DeepNest = () => (
  <ConnectForm>
    {({ register }) => <input {...register("testText")} />}
  </ConnectForm>
);

const createInput =
  <T extends unknown>() =>
  (props: InputProps_<T>) =>
    <InputController {...props} />;

export const createForm = <T extends unknown>() => {
  function Form<T extends { [key: string]: string | number | boolean }>({
    children,
    onValid,
    onInvalid,
  }: FormProps<T>): ReactElement | null {
    const methods = useForm<T>();

    const { handleSubmit } = methods;

    return (
      <FormProvider {...methods}>
        <FormElement onSubmit={handleSubmit(onValid, onInvalid)}>
          {children}
          <DeepNest />
        </FormElement>
      </FormProvider>
    );
  }
  assertFC(Form);

  // here is the point where we infer the generic arg to a child
  Form.Input = createInput<T>();

  return Form;
};

///export default createForm<T>;
