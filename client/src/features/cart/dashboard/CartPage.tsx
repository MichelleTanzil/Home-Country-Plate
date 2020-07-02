import React, { useContext, useEffect, Fragment } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Container } from 'semantic-ui-react';
import { CartTable } from './CartTable';


export const CartPage = () => {
  return (
    <Container>
      <CartTable />
    </Container>
  )
}
