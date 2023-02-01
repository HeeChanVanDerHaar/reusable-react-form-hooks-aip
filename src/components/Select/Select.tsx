import React, { ComponentProps } from "react";
import ReactSelect from "react-select";

export type SelectProps = ComponentProps<typeof ReactSelect>;

const Select: React.FC<ComponentProps<typeof ReactSelect>> = React.forwardRef(
  (props, ref) => {
    return <ReactSelect {...props} ref={ref} />;
  }
);

export default Select;
