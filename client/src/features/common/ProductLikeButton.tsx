import React, { useContext, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { IProduct } from "../../app/models/product";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const ProductLikeButton: React.FC<{ product: IProduct }> = ({ product }) => {
  const rootStore = useContext(RootStoreContext);
  const { likeProduct, unlikeProduct } = rootStore.productStore;

  const [loading, setLoading] = useState(false);

  return (
    <Button.Group key={product.id}>
      {product.isChef ? (
        <Button
          labelPosition="right"
          fluid
          as={Link}
          to={`/manage/${product.id}`}
          color="red"
        >
          <Button color="red" active>
            <Icon name="edit" />
            Edit Dish
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {product.likes.length} {product.likes.length < 2 ? "like" : "likes"}
          </Label>
          {product.likes.length}
        </Button>
      ) : product.isLiked ? (
        <Button as="div" labelPosition="right" fluid>
          <Button
            color="blue"
            active
            onClick={() => {setLoading(true); unlikeProduct(product.id).then(()=> setLoading(false)); }}
            loading={loading}
          >
            <Icon name="heart" />
            Unlike
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {product.likes.length}
          </Label>
        </Button>
      ) : (
        <Button as="div" labelPosition="right" fluid>
          <Button
            color="orange"
            active
            onClick={() => {setLoading(true); likeProduct(product.id).then(() => setLoading(false)); }}
            loading={loading}
          >
            <Icon name="heart" />
            Like
          </Button>
          <Label as="a" basic color="orange" pointing="left">
            {product.likes.length}
          </Label>
        </Button>
      )}
    </Button.Group>
  );
};

export default observer(ProductLikeButton);
