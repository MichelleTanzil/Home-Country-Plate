import React from "react";
import { List, Image, Button, Icon, Label } from "semantic-ui-react";
import { ILiker } from "../../../app/models/product";

interface IProps {
  likers: ILiker[];
}

const ProductListItemLikes: React.FC<IProps> = ({ likers }) => {
  return (
    <Button as="div" labelPosition="right" fluid>
      <Button color="orange">
        <Icon name="heart" />
        Like
      </Button>
      <Label as="a" basic color="orange" pointing="left">
        {likers.length}
      </Label>
    </Button>
  );
};

export default ProductListItemLikes;
