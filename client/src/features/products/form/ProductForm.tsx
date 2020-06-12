import React, { useContext, useState, useEffect } from "react";
import { Grid, Segment, Form, Button, Header } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { RouteComponentProps } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { ProductFormValues } from "../../../app/models/product";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import PriceInput from "../../../app/common/form/PriceInput";
import { category } from "../../../app/common/options/categoryOptions";
import { RootStoreContext } from "../../../app/stores/rootStore";
import {
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  composeValidators,
} from "revalidate";
import { convertStringToCurrency } from "../../../common/util/util";

const validate = combineValidators({
  title: isRequired({ message: "This dish needs a title" }),
  category: isRequired("Category"),
  description: composeValidators(
    // isRequired({ message: "Add a description to this dish." }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
  city: isRequired({ message: "The city this dish will originate from" }),
  state: isRequired({
    message: "The state this dish will originate from",
  }),
});

interface DetailParams {
  id: string;
}

const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    submitting,
    createProduct,
    loadProduct,
    editProduct,
  } = rootStore.productStore;

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
    console.log(typeof values.price);
    values.price = parseFloat(values.price);
    const { ...product } = values; //need to have this in order to create the new product object with the id
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

  console.log(product);

  return (
    <Grid>
      <Grid.Column width={14}>
        <Segment clearing>
          <Header as="h1">Add/edit a dish to your store</Header>
          <FinalForm
            validate={validate}
            initialValues={product}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  label="Title"
                  placeholder="Title of this dish"
                  value={product.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  label="Description"
                  placeholder="Description - Add details about the dish such as the quantity in 1 portion, flavors, origin etc."
                  rows={3}
                  value={product.description}
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  label="Cuisine"
                  placeholder="Cuisine for this dish"
                  options={category}
                  value={product.category}
                  component={SelectInput}
                />
                <Form.Group widths="equal">
                  <Field
                    name="city"
                    label="City"
                    placeholder="City"
                    value={product.city}
                    component={TextInput}
                  />
                  <Field
                    name="state"
                    label="State"
                    placeholder="State"
                    value={product.state}
                    component={TextInput}
                  />
                </Form.Group>

                <Field
                  label="Price"
                  name="price"
                  placeholder="Price of the dish"
                  value={product.cost}
                  component={PriceInput}
                  type="number"
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
