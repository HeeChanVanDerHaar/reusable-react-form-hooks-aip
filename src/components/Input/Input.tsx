import React, { forwardRef, InputHTMLAttributes } from "react";

export type InputControllerProps = {
  value?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputControllerProps>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  }
);

export default Input;
