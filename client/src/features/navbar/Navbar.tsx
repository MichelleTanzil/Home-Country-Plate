import React from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react'

export const Navbar = () => {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header exact as={NavLink} to="/">
          Home Country Plate
        </Menu.Item>
        <Menu.Item>
          <Button primary as={NavLink} to="/products">
            Explore
        </Button>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button inverted color="green">Login</Button>
          </Menu.Item>
          <Menu.Item>
            <Button inverted color="green">Register</Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}
