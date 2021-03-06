import React, { useContext, Fragment } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Table, Button, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

const CartTable = () => {
  const rootStore = useContext(RootStoreContext);
  const { cart, removeFromCart, loadingInitial } = rootStore.cartStore;
  return (
    <Fragment>
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
          {cart?.items.map((item) => (
            <Table.Row key={item.productId}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>
                <Image
                  src={item.image || "/assets/foodPlaceholder.png"}
                  size="tiny"
                />
              </Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>
                <Button negative onClick={() => removeFromCart(item.productId)} loading={loadingInitial}>
                  Remove
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  )
}
export default observer(CartTable);