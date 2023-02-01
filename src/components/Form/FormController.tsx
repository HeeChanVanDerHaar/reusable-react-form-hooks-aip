import React, { ComponentProps } from "react";
import { Controller } from "react-hook-form";

import type { FC } from "react";
import type { UseControllerProps } from "react-hook-form";

export type FormControllerProps = {
  name: string;
  Component: React.FC<any>;
  componentProps: ComponentProps<FormControllerProps["Component"]>;
  label?: string;
  required?: boolean;
  value?: string;
  rules?: UseControllerProps["rules"];
  control: any;
};

// TFrom
const FormController: FC<FormControllerProps> = ({
  name,
  Component,
  componentProps,
  control,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Component {...componentProps} {...field} />}
    />
    // {errors[name] && <p>{errors[name]?.message as string}</p>}
  );
};

export default FormController;
