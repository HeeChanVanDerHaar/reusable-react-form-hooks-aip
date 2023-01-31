import React from "react";
import type { FC, InputHTMLAttributes } from "react";

import FormController from "../Form/FormController";
import Input from "./Input";

export type InputControllerProps = {
  name: string;
  value?: string;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputController: FC<InputControllerProps> = ({
  name,
  label,
  value,
  ...args
}) => {
  return (
    <FormController
      name={name}
      label={label}
      value={value}
      Component={Input}
      componentProps={args}
    />
  );
};

export default InputController;
