type Values<T> = T[keyof T];

export type ValueHolder<T> = Values<{
  [Prop in keyof T & string]: {
    name: Prop;
    type: T[Prop] extends string
      ? "text"
      : T[Prop] extends number
      ? "number"
      : T[Prop] extends boolean
      ? "checkbox" | "radio"
      : never;
    value?: T[Prop];
  };
}>;
