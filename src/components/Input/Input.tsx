import React, { forwardRef } from "react";

import { InputControllerProps } from "./InputController";

const Input = forwardRef<HTMLInputElement, InputControllerProps>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  }
);

export default Input;
