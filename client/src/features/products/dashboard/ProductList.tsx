import React, { useContext, useEffect, Fragment } from "react";
import {
  List,
  Item,
  Image,
  Grid,
  Button,
  Icon,
  Segment,
  Header,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ProductList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadProducts,
    productsByCategories: products,
    loadingInitial,
  } = rootStore.productStore;
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (loadingInitial)
    return <LoadingComponent content="Loading delicious dishes..." />;

  return (
    <Fragment>
      <Segment>
        <Icon name="search"></Icon>
      </Segment>
      {products.map(([group, products]) => (
        <Grid>
          <Grid.Column width={16}>
            <Header dividing as="h1">
              {group}
            </Header>
          </Grid.Column>
          <Grid.Column width={3} key={group}>
            <Item.Group>
              {products.map((product) => (
                <List key={product.id}>
                  <Image
                    src={product.image || "/assets/foodPlaceholder.png"}
                    size="medium"
                    as={Link}
                    to={`/products/${product.id}`}
                    rounded
                  />
                  <List.Header as="h3">{product.title}</List.Header>
                  <List.Item>
                    <List.Icon name="marker" />
                    <List.Content>
                      {product.city}, {product.state}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="dollar" />
                    <List.Content>{product.price}</List.Content>
                  </List.Item>
                  <Button animated="vertical" color="teal" size="big" fluid>
                    <Button.Content hidden>Add to cart</Button.Content>
                    <Button.Content visible>
                      <Icon name="shop" />
                    </Button.Content>
                  </Button>
                </List>
              ))}
            </Item.Group>
          </Grid.Column>
        </Grid>
      ))}
    </Fragment>
  );
};

export default observer(ProductList);
