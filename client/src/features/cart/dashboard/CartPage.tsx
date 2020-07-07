import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Container } from 'semantic-ui-react';
import CartTable from './CartTable';
import { observer } from 'mobx-react-lite';
import EmptyCart from './EmptyCart';
import LoadingComponent from '../../../app/layout/LoadingComponent';


const CartPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadCart, cart, loadingInitial } = rootStore.cartStore;

  useEffect(() => {
    loadCart();
  }, [loadCart])
  if (loadingInitial)
  return <LoadingComponent content="Loading your cart..." />;

  return (
    <Container>
      {(cart === null || Object.is("", cart)) ?
        <EmptyCart />
        :
        <CartTable />
      }
    </Container>
  )
}

export default observer(CartPage);