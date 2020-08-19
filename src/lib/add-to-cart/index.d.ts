export const events: {
  PRODUCT: {
    ADDED_TO_CART: string,
    NOT_ADDED_TO_CART: string
  }
}

declare module "Form" {
  import React from 'react';

  interface FormProps {
    amount: number;
    product: number;

    label?: string;
    icon?: 'box'|'wine-bottle';
    classes?: Array<string>;
  }

  export const Form: (props: FormProps) => React.ComponentClass<FormProps>
}
