import React, { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import Input from "./Input";

export type InputControlProps = {
  value?: string;
  label?: string;
  formState?: any; // TODO: get the typing right from react-hook-form
  fieldState?: any; // TODO: get the typing right from react-hook-form
} & InputHTMLAttributes<HTMLInputElement>;

const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  (props, ref) => {
    const { label, fieldState, formState, ...restProps } = props;
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
