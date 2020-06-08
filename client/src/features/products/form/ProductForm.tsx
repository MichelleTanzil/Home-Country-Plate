import React, { useContext, useState, useEffect } from "react";
import { Grid, Segment, Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import ProductStore from "../../../app/stores/productStore";
import { RouteComponentProps } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { ProductFormValues } from "../../../app/models/product";
import TextInput from "../../../common/form/TextInput";
import TextAreaInput from "../../../common/form/TextAreaInput";
import SelectInput from "../../../common/form/SelectInput";
import PriceInput from "../../../common/form/PriceInput";
import { category } from "../../../common/options/categoryOptions";

interface DetailParams {
  id: string;
}

const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const productStore = useContext(ProductStore);
  const { submitting, createProduct, loadProduct, editProduct } = productStore;

  const [product, setProduct] = useState(new ProductFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadProduct(match.params.id)
        .then((product) => setProduct(product))
        .finally(() => setLoading(false));
    }
  }, [setLoading, loadProduct, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    if (!product.id) {
      let newProduct = {
        ...product,
        id: uuid(),
      };
      createProduct(newProduct);
    } else {
      editProduct(product);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            // validate={validate}
            initialValues={product}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={product.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={product.description}
                  component={TextAreaInput}
                />
                {/* TODO: Select Inputs */}
                <Field
                  name="category"
                  placeholder="Category"
                  options={category}
                  value={product.category}
                  component={SelectInput}
                />
                <Field
                  name="city"
                  placeholder="City"
                  value={product.city}
                  component={TextInput}
                />
                <Field
                  name="state"
                  placeholder="State"
                  value={product.state}
                  component={TextInput}
                />
                {/* TODO: Price Input */}
                <Field
                  name="price"
                  placeholder="Price"
                  value={product.price}
                  component={PriceInput}
                />
                {/* TODO: Image upload */}
                <p>Image upload goes here</p>
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  color="blue"
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={
                    product.id
                      ? () => history.push(`/products/${product.id}`)
                      : () => history.push("/products")
                  }
                  disabled={loading}
                  floated="right"
                  type="submit"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default ProductForm;
