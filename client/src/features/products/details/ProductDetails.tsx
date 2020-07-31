import React, { useContext, useEffect } from "react";
import { Icon, Grid, Button } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductDetailedImages from "./ProductDetailedImages";
import ProductDetailedInfo from "./ProductDetailedInfo";
import ProductDetailedSellerInfo from "./ProductDetailedSellerInfo";
import ProductLikeButton from "../../common/ProductLikeButton";
import ProductDetailedPhotos from "./ProductDetailedPhotos";
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
      <Grid.Row>
        <Grid.Column width={6} stretched>
          <ProductDetailedImages product={product} />
          <ProductLikeButton product={product} />
        </Grid.Column>
        <Grid.Column width={7}>
          <ProductDetailedInfo product={product} />
          <Button animated="vertical" color="teal" fluid size="large">
            <Button.Content hidden>Add to cart</Button.Content>
            <Button.Content visible>
              <Icon name="shop" size="large" />
            </Button.Content>
          </Button>
        </Grid.Column>
        <Grid.Column width={3}>
          <ProductDetailedSellerInfo product={product} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={13}>
          <ProductDetailedPhotos product={product} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(ProductDetails);
