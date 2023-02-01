import React, { forwardRef } from "react";
import type { FC, InputHTMLAttributes } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import Input from "./Input";

export type InputControlProps = {
  value?: string;
  label?: string;
  fieldState?: any; // TODO: get the typing right
  rules?: any; // TODO: get the typing right
} & InputHTMLAttributes<HTMLInputElement>;

const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  (props, ref) => {
    const { label, fieldState, ...restProps } = props;
    return (
      <div>
        <label>{label}</label>
        <Input {...restProps} ref={ref} />
        <p>error: {fieldState?.error?.message}</p>
      </div>
    );
  }
);

Input.displayName = "InputControl";

export default InputControl;
