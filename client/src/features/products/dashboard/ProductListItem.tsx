import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { IProduct, ILiker } from "../../../app/models/product";
import { List, Button, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ProductLikeButton from "../../common/ProductLikeButton";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    addToCart,
    cart,
    removeFromCart,
    loadingInitial,
  } = rootStore.cartStore;
  const chef: ILiker = product.likes.filter((x) => x.isChef)[0];

  return (
    <List key={product.id}>
      <Image
        src={product.image || "/assets/foodPlaceholder.png"}
        size="medium"
        as={Link}
        to={`/products/${product.id}`}
        rounded
      />
      <List.Header as="h3">{product.title}</List.Header>
      <List.Item>
        <List.Icon name="marker" />
        <List.Content>
          {product.city}, {product.state}
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="dollar" />
        <List.Content>{product.price}</List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="food" />
        <List.Content>
          Cooked by
          <Link to={`/profile/${chef.username}`}> {chef.displayName}</Link>
        </List.Content>
      </List.Item>
      {cart?.items.find((x) => x.productId === product.id) ? (
        <Button
          color="olive"
          size="large"
          fluid
          onClick={() => removeFromCart(product.id)}
          loading={loadingInitial}
        >
          <Button.Content hidden>Remove from cart</Button.Content>
        </Button>
      ) : (
        <Button
          animated="vertical"
          color="teal"
          size="large"
          fluid
          onClick={() => addToCart(product.id)}
          loading={loadingInitial}
        >
          <Button.Content hidden>Add to cart</Button.Content>
          <Button.Content visible>
            <Icon name="shop" />
          </Button.Content>
        </Button>
      )}
      <List.Item>
        <ProductLikeButton product={product} />
      </List.Item>
    </List>
  );
};

export default observer(ProductListItem);
