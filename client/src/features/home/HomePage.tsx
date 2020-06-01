import React from 'react'
import { Message, Icon, Segment, Container } from 'semantic-ui-react';

export const HomePage = () => {
  return (
    <Segment textAlign='center' vertical className='masthead'>
      <Container text>
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Just one second</Message.Header>
      There will be something in here soon
    </Message.Content>
        </Message>
      </Container>
    </Segment>
  )
}
