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
  register?: UseFormRegister<T>;
  defaultValue?: PathValue<T, Path<T>>;
  shouldUnregister?: boolean;
  rules?: Omit<
    RegisterOptions<T>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >; // TODO: Extract to own custom type
  isNative?: boolean;
  omitFieldState?: boolean; // TODO: 🤔 Boolean for handling non controlled components which don't accept a fieldstate prop. Third party element or Native elements
};

export function FormControl<T extends FieldValues>(
  props: FormControlBaseProps<T>
) {
  const {
    children,
    isNative,
    omitFieldState = false,
    name,
    // Need to pas a defaultvalue here otherwise react hooks form will complain. https://github.com/react-hook-form/react-hook-form/discussions/6443
    // Can not get the typing right here :(
    defaultValue = "" as any,
    control,
    register,
    rules,
  } = props;

  const { field, fieldState, formState } = useController({
    name,
    control,
    defaultValue,
    rules,
  });

  // TODO: Restrict to 1 child policy. Handle error gracefully!
  if (React.Children.count(children) > 1) {
    console.error("FormControl can not have more than 1 child");
    return <></>;
  }

  const controlledFormElement = React.Children.only(children); // TODO: 🤔  Mwah... Not so sure about this.
  const formAttributes =
    isNative && register ? { ...register(name) } : { ...field };

  // TODO: Find a better way to optionally pass fieldState and formState;

  const propsMap = new Map(
    Object.entries({
      ...controlledFormElement.props,
      ...formAttributes,
    })
  );

  if ("fieldState" in controlledFormElement.props) {
    propsMap.set("fieldState", fieldState);
  }

  if ("formState" in controlledFormElement.props) {
    propsMap.set("formState", formState);
  }

  return (
    <>
      {React.createElement(controlledFormElement.type, {
        ...Object.fromEntries(propsMap),
      })}
    </>
  );
}
