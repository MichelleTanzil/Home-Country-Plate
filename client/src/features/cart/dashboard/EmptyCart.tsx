import React from 'react'
import { observer } from 'mobx-react-lite'
import { Container, Header, Icon, Button } from 'semantic-ui-react'

const EmptyCart = () => {
  return (
    <Container>
      <Header>
        <Icon name="food" circular />
        <Header.Content>Your cart is empty!</Header.Content>
      </Header>
    </Container>
  )
}

export default observer(EmptyCart);