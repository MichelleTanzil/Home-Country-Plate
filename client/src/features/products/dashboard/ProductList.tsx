import React, { useContext, useEffect, Fragment } from "react";
import {
  List,
  Label,
  Item,
  Image,
  Grid,
  Button,
  Icon,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import ProductStore from "../../../app/stores/productStore";

const ProductList: React.FC = () => {
  const productStore = useContext(ProductStore);
  const { loadProducts, productsByCategories: products } = productStore;
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  return (
    <Fragment>
      <p>Search bar will go here...</p>
      <Grid divided>
        {products.map(([group, products]) => (
          <Grid.Column width={3} key={group}>
            <Label size="large" color="olive">
              {group}
            </Label>
            <Item.Group divided>
              {products.map((product) => (
                <List key={product.id}>
                  <Image
                    src={product.image || "/assets/foodPlaceholder.png"}
                    size="medium"
                    as={Link}
                    to={`/products/${product.id}`}
                    rounded
                  />
                  <List.Header as="h2">{product.title}</List.Header>
                  <List.Item>
                    <List.Icon name="marker" />
                    <List.Content>
                      {product.city}, {product.state}
                    </List.Content>
                  </List.Item>
                </List>
              ))}
              <Button animated="vertical" color="teal" size="large">
                <Button.Content hidden>Add to cart</Button.Content>
                <Button.Content visible>
                  <Icon name="shop" />
                </Button.Content>
              </Button>
            </Item.Group>
          </Grid.Column>
        ))}
      </Grid>
    </Fragment>
  );
};

export default observer(ProductList);
