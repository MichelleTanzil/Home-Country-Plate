import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Container, Button, Image, Dropdown, Icon, Label } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

export const Navbar = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user, logout } = rootStore.userStore;
  const { cart } = rootStore.cartStore;
  const { openModal } = rootStore.modalStore;
  console.log(user?.username)
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
          {/* TODO: Move this to selling page later on */}
          <Button
            primary
            as={NavLink}
            to="/createDish"
            content="Add new dish"
          ></Button>
        </Menu.Item>
        {isLoggedIn && user ? (
          <Menu.Item position="right">
            <Menu.Item>
              <Button as={NavLink} to="/cart" icon>
                <Icon name='shopping cart' />
                {cart && <Label color='red' floating style={{padding:"3px"}}>
                  {cart?.items.length}
                </Label>}
              </Button>
            </Menu.Item>
            <Image
              avatar
              spaced="right"
              src={user.image || "/assets/userPlaceholder.png"}
            />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        ) : (
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
          )}
      </Container>
    </Menu>
  );
};
