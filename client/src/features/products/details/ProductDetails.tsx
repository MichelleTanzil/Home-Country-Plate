import React, { useContext, useEffect } from "react";
import { Icon, Grid, Button } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductDetailedImages from "./ProductDetailedImages";
import ProductDetailedInfo from "./ProductDetailedInfo";
import ProductDetailedSellerInfo from "./ProductDetailedSellerInfo";

interface DetailParams {
  id: string;
}

const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { product, loadProduct, loadingInitial } = rootStore.productStore;

  useEffect(() => {
    loadProduct(match.params.id);
  }, [loadProduct, match.params.id, history]);

  if (loadingInitial || !product)
    return (
      <LoadingComponent content="Loading your choice of delicious food..." />
    );
  return (
    <Grid>
      <Grid.Column width={8}>
        <ProductDetailedImages />
      </Grid.Column>
      <Grid.Column width={8}>
        <ProductDetailedInfo product={product} />
        <Button animated="vertical" color="teal" fluid size="large">
          <Button.Content hidden>Add to cart</Button.Content>
          <Button.Content visible>
            <Icon name="shop" size="large" />
          </Button.Content>
        </Button>
      </Grid.Column>
      <Grid.Column width={6}>
        <ProductDetailedSellerInfo />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductDetails);
