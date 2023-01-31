import React, { ComponentProps } from "react";
import ReactSelect from "react-select";

export type SelectProps = ComponentProps<typeof ReactSelect>;

const Select: React.FC<ComponentProps<typeof ReactSelect>> = ({ ...props }) => (
  <ReactSelect {...props} />
);

export default Select;
