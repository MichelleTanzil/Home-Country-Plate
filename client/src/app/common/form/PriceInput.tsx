import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Input } from "semantic-ui-react";
import NumberFormat from "react-number-format";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const PriceInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
  label,
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <label>{label}</label>
      <Input {...input} placeholder={placeholder} labelPosition="right">
        <Label basic>$</Label>
        <NumberFormat
          thousandSeparator={true}
          precision={2}
          value={input.value}
        />
      </Input>
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default PriceInput;
