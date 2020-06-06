import React from "react";
import { HomePage } from "../../features/home/HomePage";
import { Navbar } from "../../features/navbar/Navbar";
import {
  Route,
  Switch,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { Container } from "semantic-ui-react";
import ProductList from "../../features/products/dashboard/ProductList";
import ProductDetails from "../../features/products/dashboard/ProductDetails";
import NotFound from "./NotFound";
import { ToastContainer } from 'react-toastify';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <ToastContainer position='bottom-right' />
      <Navbar />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/products" component={ProductList} />
                <Route path="/products/:id" component={ProductDetails} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(App);
