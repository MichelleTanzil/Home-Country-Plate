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
        avatar
        size="large"
        src={chef.image || "/assets/userPlaceholder.png"}
        as={Link}
        to={`/profile/${chef.username}`}
      />
      <Card.Content>
        <Card.Header>
          <Link to={`/profile/${chef.username}`}>{chef.displayName}</Link>
        </Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Anonymous is a cook who has been cooking for decades specializing in
          burgers.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" as={Link} to={`/profile/${chef.username}`} />
        22 Following
      </Card.Content>
      <Card.Content extra>
        <Icon name="thumbs up" as={Link} to={`/profile/${chef.username}`} />
        11 Liked
      </Card.Content>
      <Card.Content extra>
        <Icon name="food" as={Link} to={`/profile/${chef.username}`} />
        150 dishes sold
      </Card.Content>
    </Card>
  );
};

export default ProductDetailedSellerInfo;
