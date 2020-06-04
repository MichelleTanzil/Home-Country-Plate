import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

export const ProductDetails = () => {
  return (
    <Card fluid>
      <Image
        src={"/assets/foodPlaceholder.png"}
        wrapped
        ui={false}
        size="medium"
      />
      <Card.Content>
        <Card.Header>Title</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href={"/products"}>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
  );
};
