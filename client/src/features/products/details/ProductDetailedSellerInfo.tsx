import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProductDetailedSellerInfo = () => {
  return (
    <Card>
      <Image src="/assets/userPlaceholder.png" size="small" />
      <Card.Content>
        <Card.Header>Anonymous</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Anonymous is a cook who has been cooking for decades specializing in
          burgers.
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
  );
};

export default ProductDetailedSellerInfo;
