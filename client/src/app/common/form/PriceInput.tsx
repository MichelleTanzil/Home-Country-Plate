import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<number, HTMLElement>,
    FormFieldProps {}

const PriceInput: React.FC<IProps> = ({
  input: { name, type },
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Input
      type={type}
      error={touched && !!error}
      labelPosition="right"
      placeholder={placeholder}
      fluid
    >
      <Label basic>$</Label>
      <input name={name} step="0.01" />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Input>
  );
};

export default PriceInput;
