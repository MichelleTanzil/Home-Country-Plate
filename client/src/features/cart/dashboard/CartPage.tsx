import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Container } from 'semantic-ui-react';
import CartTable from './CartTable';
import { observer } from 'mobx-react-lite';
import EmptyCart from './EmptyCart';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../stripe/CheckoutForm';


const CartPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadCart, cart, loadingInitial } = rootStore.cartStore;

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!)
  useEffect(() => {
    loadCart();
  }, [loadCart])
  if (loadingInitial)
    return <LoadingComponent content="Loading your cart..." />;

  return (
    <Container>
      {cart?.items.slice().length === 0 ?
        <EmptyCart />
        :
        <>
          <CartTable />
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </>
      }
    </Container>
  )
}

export default observer(CartPage);