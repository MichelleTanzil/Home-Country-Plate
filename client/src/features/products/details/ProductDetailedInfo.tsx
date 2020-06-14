import React from "react";
import { Segment, Header, Divider, Icon } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";

const ProductDetailedInfo: React.FC<{ product: IProduct }> = ({ product }) => {
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
    </Segment>
  );
};

export default ProductDetailedInfo;
