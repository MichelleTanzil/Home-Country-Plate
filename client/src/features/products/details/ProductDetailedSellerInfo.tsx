import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ILiker, IProduct } from "../../../app/models/product";

const ProductDetailedSellerInfo: React.FC<{ product: IProduct }> = ({
  product,
}) => {
  const chef: ILiker = product.likes.filter((x) => x.isChef)[0];

  return (
    <Card>
      <Image
        circular
        size="small"
        src={chef.image || "/assets/userPlaceholder.png"}
        as={Link}
        to={`/profile/${chef.username}`}
        centered
      />
      <Card.Content>
        <Card.Header>
          <Link to={`/profile/${chef.username}`}>{chef.displayName}</Link>
        </Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <a href={`/profile/${chef.username}`}>
          <Icon name="user" />
          22 Following
        </a>
      </Card.Content>
      <Card.Content extra>
        <a href={`/profile/${chef.username}`}>
          <Icon name="thumbs up" />
          11 Liked
        </a>
      </Card.Content>
      <Card.Content extra>
        <a href={`/profile/${chef.username}`}>
          <Icon name="food" />
          150 dishes sold
        </a>
      </Card.Content>
    </Card>
  );
};

export default ProductDetailedSellerInfo;
