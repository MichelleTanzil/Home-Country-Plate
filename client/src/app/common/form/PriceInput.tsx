import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<number, HTMLElement>,
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
    <Form.Field error={touched && !!error} type={type} width={width} inline>
      <label>{label}</label>
      <Form.Input placeholder={placeholder} focus labelPosition="right" fluid>
        <Label basic>$</Label>
        <input {...input} />
      </Form.Input>
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default PriceInput;