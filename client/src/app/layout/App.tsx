import React, { useContext, useEffect, Fragment } from "react";
import { HomePage } from "../../features/home/HomePage";
import { Navbar } from "../../features/navbar/Navbar";
import {
  Route,
  Switch,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { Container } from "semantic-ui-react";
import ProductDetails from "../../features/products/details/ProductDetails";
import NotFound from "./NotFound";
import ProductForm from "../../features/products/form/ProductForm";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import { observer } from "mobx-react-lite";
import ModalContainer from "../common/modals/ModalContainer";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import ProfilePage from "../../features/profiles/ProfilePage";
import { CartPage } from "../../features/cart/dashboard/CartPage";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { appLoaded, setAppLoaded, token } = rootStore.commonStore;
  const { getUser, user } = rootStore.userStore;
  const { loadCart } = rootStore.cartStore;

  useEffect(() => {
    if (token) {
      setAppLoaded();
      loadCart();
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token, loadCart]);

  if (!appLoaded)
    return <LoadingComponent content="Loading Home Country Plate..." />;
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Navbar />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/products" component={ProductDashboard} />
                <Route path="/products/:id" component={ProductDetails} />
                <Route
                  key={location.key}
                  path={["/createDish", "/manage/:id"]}
                  component={ProductForm}
                />
                <Route path="/profile/:username" component={ProfilePage} />
                {user && <Route path="/cart" component={CartPage} />}
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
