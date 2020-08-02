import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Segment, Icon, Grid, Loader } from "semantic-ui-react";
import ProductList from "./ProductList";
import InfiniteScroll from "react-infinite-scroller";

const ProductDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadProducts,
    loadingInitial,
    setPage,
    page,
    totalPages,
  } = rootStore.productStore;
  const { loadCart } = rootStore.cartStore;
  const { isLoggedIn } = rootStore.userStore;

  const [loadingNext, setLoadingNext] = useState(false);
  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadProducts().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadProducts();
    if (isLoggedIn) loadCart();
  }, [loadProducts, loadCart, isLoggedIn]);

  if (loadingInitial && page === 0)
    return <LoadingComponent content="Loading delicious dishes..." />;
  return (
    <Grid>
      <Grid.Column width={16}>
        {/* <Segment>
          <Icon name="search"></Icon>
        </Segment> */}
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && page + 1 < totalPages}
          initialLoad={false}
        >
          <ProductList />
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width={16}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductDashboard);
