import React, { useContext, useEffect } from "react";
import {
  Header,
  Card,
  Icon,
  Image,
  Grid,
  Button,
  Segment,
  Divider,
} from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";

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
        <Image src={"/assets/foodPlaceholder.png"} wrapped size="large" />
      </Grid.Column>
      <Grid.Column width={8}>
        <Segment>
          <Header as="h1" textAlign="center">
            {product.title}
          </Header>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="tag" />
              Description
            </Header>
          </Divider>
          <p>{product.description}</p>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="food" />
              Tags
            </Header>
          </Divider>
          <p>Vegan, Dairy Free, Contains Nuts</p>
        </Segment>
        <Button animated="vertical" color="teal" fluid size="large">
          <Button.Content hidden>Add to cart</Button.Content>
          <Button.Content visible>
            <Icon name="shop" size="large" />
          </Button.Content>
        </Button>
      </Grid.Column>
      <Grid.Column width={6}>
        <Card>
          <Image src="/assets/userPlaceholder.png" size="small" />
          <Card.Content>
            <Card.Header>Anonymous</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Anonymous is a cook who has been cooking for decades specializing
              in burgers.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {/* TODO: Link to user's profile */}
            <Icon name="user" as={Link} to={`/products`} />
            22 Following
          </Card.Content>
          <Card.Content extra>
            <Icon name="thumbs up" as={Link} to={`/products`} />
            11 Liked
          </Card.Content>
          <Card.Content extra>
            <Icon name="food" as={Link} to={`/products`} />
            150 dishes sold
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductDetails);
