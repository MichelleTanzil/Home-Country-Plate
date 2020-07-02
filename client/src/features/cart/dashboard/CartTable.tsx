import React, { useContext, Fragment } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Header, Icon, Button, Table } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export const CartTable = () => {
  const rootStore = useContext(RootStoreContext);
  const { cart, loadingInitial } = rootStore.cartStore;
  if (loadingInitial)
    return <LoadingComponent content="Loading your cart..." />;
  return (
    <Fragment>
      {(cart === null) ? (
        <Header>
          <Icon name="food" circular />
          <Header.Content>Your cart is empty!</Header.Content>
          <Button>Go to the dishes</Button>
        </Header>
      ) :
        (
          <Table basic='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {cart.items.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.image}</Table.Cell>
                  <Table.Cell>{item.price}</Table.Cell>
                  <Table.Cell>{item.quantity}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
    </Fragment>
  )
}
