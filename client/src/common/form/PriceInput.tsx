import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import CurrencyInput from "react-currency-input-field";

interface IProps
  extends FieldRenderProps<number, HTMLElement>,
    FormFieldProps {}

const PriceInput: React.FC<IProps> = ({
  width,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <CurrencyInput
        placeholder={placeholder}
        allowDecimals={true}
        decimalsLimit={2}
        prefix="$"
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default PriceInput;
