import React, { useContext } from "react";
import {
  Segment,
  Header,
  Divider,
  Icon,
  List,
  Popup,
  Image,
} from "semantic-ui-react";
import { IProduct, ILiker } from "../../../app/models/product";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const ProductDetailedInfo: React.FC<{ product: IProduct }> = ({ product }) => {
  const rootStore = useContext(RootStoreContext);
  const chef: ILiker = product.likes.filter((x) => x.isChef)[0];
  return (
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
      <Divider horizontal>
        <Header as="h4">
          <Icon name="heart" />
          Liked by {product.likes.length}{" "}
          {product.likes.length === 1 ? "Person" : "People"}
        </Header>
      </Divider>
      <List horizontal>
        {product.likes.map((like) => (
          <List.Item key={like.username}>
            <Popup
              header={like.displayName}
              trigger={
                <Image
                  size="mini"
                  circular
                  src={like.image || "/assets/userPlaceholder.png"}
                  as={Link}
                  to={`/profile/${like.username}`}
                />
              }
            />
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

export default observer(ProductDetailedInfo);
