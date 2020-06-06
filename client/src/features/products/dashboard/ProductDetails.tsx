import React, { useContext, useEffect } from "react";
import { Card, Icon, Image, Grid, GridColumn, Button } from "semantic-ui-react";
import ProductStore from "../../../app/stores/productStore";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface DetailParams {
  id: string;
}

const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const productStore = useContext(ProductStore);
  const { product, loadProduct, loadingInitial } = productStore;

  useEffect(() => {
    loadProduct(match.params.id);
  }, [loadProduct, match.params.id, history]);

  if (loadingInitial || !product)
    return (
      <LoadingComponent content="Loading your choice of delicious food..." />
    );
  return (
    <Grid>
      <GridColumn width={8}>
        <Image src={"/assets/foodPlaceholder.png"} wrapped size="medium" />
        <Button animated="vertical" color="teal" size="large">
          <Button.Content hidden>Add to cart</Button.Content>
          <Button.Content visible>
            <Icon name="shop" size="large" />
          </Button.Content>
        </Button>
      </GridColumn>
      <GridColumn width={8}></GridColumn>
      <Card fluid>
        <Card.Content>
          <Card.Header>{product.title}</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>{product.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a href={"/products"}>
            <Icon name="user" />
            22 Friends
          </a>
        </Card.Content>
      </Card>
    </Grid>
  );
};

export default observer(ProductDetails);
