import React, { useContext } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { ILiker, IProduct } from "../../../app/models/product";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

interface IProps {
  product: IProduct;
}

const ProductListItemLikes: React.FC<IProps> = ({ product }) => {
  const rootStore = useContext(RootStoreContext);
  const chef: ILiker = product.likes.filter((x) => x.isChef)[0];
  return (
    <Button as="div" labelPosition="right" fluid>
      <Button color="orange" active>
        <Icon name="heart" />
        Like
      </Button>
      <Label as="a" basic color="orange" pointing="left">
        {product.likes.length}
      </Label>
    </Button>
  );
};

export default observer(ProductListItemLikes);
