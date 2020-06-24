import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const ProductListItemLikes: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Button.Group>
      {product.isChef ? (
        <Button
          labelPosition="right"
          fluid
          as={Link}
          to={`/manage/${product.id}`}
          color="red"
        >
          <Button color="red" active>
            <Icon name="heart" />
            You are the chef
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {product.likes.length}
          </Label>
          {product.likes.length}
        </Button>
      ) : product.isLiked ? (
        //  loading={loading} onClick={cancelAttendance}
        <Button as="div" labelPosition="right" fluid>
          <Button color="orange" active>
            <Icon name="heart" />
            Unlike
          </Button>
          <Label as="a" basic color="orange" pointing="left">
            {product.likes.length}
          </Label>
        </Button>
      ) : (
        <Button as="div" labelPosition="right" fluid>
          <Button color="orange" active>
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

export default observer(ProductListItemLikes);
