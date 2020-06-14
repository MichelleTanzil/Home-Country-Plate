import React, { useContext, Fragment } from "react";
import { Item, Grid, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductListItem from "./ProductListItem";

const ProductList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { productsByCategories } = rootStore.productStore;
  return (
    <Fragment>
      {productsByCategories.map(([group, products]) => (
        <Grid key={group}>
          <Grid.Column width={16}>
            <Header dividing as="h1">
              {group}
            </Header>
          </Grid.Column>
          <Grid.Column width={3} key={group}>
            <Item.Group>
              {products.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </Item.Group>
          </Grid.Column>
        </Grid>
      ))}
    </Fragment>
  );
};

export default observer(ProductList);
