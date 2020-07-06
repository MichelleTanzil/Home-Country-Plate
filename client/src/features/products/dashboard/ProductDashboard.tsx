import React, { useContext, useEffect, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Segment, Icon } from "semantic-ui-react";
import ProductList from "./ProductList";

const ProductDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadProducts, loadingInitial } = rootStore.productStore;
  const { loadCart } = rootStore.cartStore;
  const { isLoggedIn } = rootStore.userStore;
  useEffect(() => {
    loadProducts();
    if (isLoggedIn)
      loadCart();
  }, [loadProducts, loadCart, isLoggedIn]);

  if (loadingInitial)
    return <LoadingComponent content="Loading delicious dishes..." />;
  return (
    <Fragment>
      <Segment>
        <Icon name="search"></Icon>
      </Segment>
      <Fragment>
        <ProductList />
      </Fragment>
    </Fragment>
  );
};

export default observer(ProductDashboard);
