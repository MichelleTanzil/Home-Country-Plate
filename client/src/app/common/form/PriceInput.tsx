import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Input } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<number, HTMLElement>,
  FormFieldProps { }

const PriceInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width} inline>
      <Form.Input
        {...input}
        labelPosition="right"
        placeholder={placeholder}
        fluid
        focus
      />
      <Label basic>$</Label>
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default PriceInput;
