import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

export const Navbar = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header exact as={NavLink} to="/">
          Home Country Plate
        </Menu.Item>
        <Menu.Item>
          <Button
            primary
            as={NavLink}
            to="/products"
            content="Explore"
          ></Button>
        </Menu.Item>
        <Menu.Item>
          {/* TODO: Move this later on */}
          <Button
            primary
            as={NavLink}
            to="/createDish"
            content="Add new dish"
          ></Button>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              inverted
              color="green"
              content="Login"
              onClick={() => openModal(<LoginForm />)}
            ></Button>
          </Menu.Item>
          <Menu.Item>
            <Button
              inverted
              color="green"
              content="Register"
              onClick={() => openModal(<RegisterForm />)}
            ></Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
