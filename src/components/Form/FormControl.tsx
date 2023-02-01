import React from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  PathValue,
  Path,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";

export type FormControlBaseProps<T extends FieldValues> = {
  children: React.ReactElement | React.ReactElement[];
  name: FieldPath<T>;
  control: Control<T>;
  isNative?: boolean;
  register?: UseFormRegister<T>;
  defaultValue?: PathValue<T, Path<T>>;
  omitFieldState?: boolean; // TODO: Boolean for handling non controlled components which don't accept a fieldstate prop. Third party element or Native elements
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >; // TODO: Extract to own custom type
};

export function FormControl<T extends FieldValues>({
  children,
  name,
  isNative,
  // Need to pas a defaultvalue here otherwise react hooks form will complain. https://github.com/react-hook-form/react-hook-form/discussions/6443
  // Can not get the typing right here :(
  defaultValue = "" as any,
  omitFieldState = false,
  control,
  register,
  rules,
}: FormControlBaseProps<T>) {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
    rules,
  });

  // Restrict to 1 child policy. Handle error gracefully!
  if (React.Children.count(children) > 1) {
    console.error("FormControl can not have more than 1 child");
    return <></>;
  }

  const controlledFormElement = React.Children.only(children); // TODO: Mwah...
  const formAttributes =
    isNative && register ? { ...register(name) } : { ...field };

  const props = omitFieldState
    ? {
        ...controlledFormElement.props,
        ...formAttributes,
      }
    : {
        ...controlledFormElement.props,
        ...formAttributes,
        fieldState,
      };

  return <>{React.createElement(controlledFormElement.type, { ...props })}</>;
}
