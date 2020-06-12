import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Input } from "semantic-ui-react";
import CurrencyInput from "react-currency-input-field";

interface IProps
  extends FieldRenderProps<number, HTMLElement>,
  FormFieldProps { }

const PriceInput: React.FC<IProps> = ({
  input : {name },
  type,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Input type={type} error={touched && !!error} labelPosition='right' placeholder={placeholder} fluid>
      <Label basic>$</Label>
      <input
        name={name}
        step="0.1"
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Input>
  );
};

export default PriceInput;
