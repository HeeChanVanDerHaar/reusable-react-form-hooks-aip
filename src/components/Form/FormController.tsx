import React, { ComponentProps, useState } from "react";
import { Controller } from "react-hook-form";

import type { FC } from "react";
import type { UseControllerProps } from "react-hook-form";

import { newId } from "../../utils";

import { LabelAndInputContainer } from "../Form/FormStyles";
import ConnectForm from "../ConnectForm";
import Input from "../Input/Input";

export type FormControllerProps = {
  name: string;
  Component: React.FC<any>;
  componentProps: ComponentProps<FormControllerProps["Component"]>;
  label?: string;
  required?: boolean;
  value?: string;
  rules?: UseControllerProps["rules"];
};

const FormController: FC<FormControllerProps> = ({
  name,
  label,
  value,
  Component,
  componentProps,
  rules: rulesProp,
  required,
}) => {
  const [id] = useState(() => (label ? newId("controller") : ""));

  if (!id && label) return null;

  const rules = rulesProp || {};
  if (required) {
    rules.required = "This field is required";
  }

  // todo add support for value
  // todo create unit tests
  // todo add support for layout

  // Test detected component type
  console.log("Component is Input", Component === Input);
  console.log("Component type attribute", componentProps.type);

  return (
    <ConnectForm>
      {({ control, formState: { errors } }) => {
        return (
          <LabelAndInputContainer>
            {id && <label htmlFor={id}>{label}&nbsp;</label>}
            <Controller
              control={control}
              name={name}
              rules={rules}
              render={({ field }) => (
                <Component {...componentProps} {...field} />
              )}
            />
            {errors[name] && <p>{errors[name]?.message as string}</p>}
          </LabelAndInputContainer>
        );
      }}
    </ConnectForm>
  );
};

export default FormController;
