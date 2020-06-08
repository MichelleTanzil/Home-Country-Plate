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
import ProductDetails from "../../features/products/details/ProductDetails";
import NotFound from "./NotFound";
import ProductForm from "../../features/products/form/ProductForm";
import { ToastContainer } from "react-toastify";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  //TODO: Add when jwt is configured
  // const commonStore = useContext(CommonStore);
  // const { appLoaded, setAppLoaded } = commonStore;
  // useEffect(() => {
  //   if (token) {
  //     getUser().finally(() => setAppLoaded());
  //   } else {
  //     setAppLoaded();
  //   }
  // }, [getUser, setAppLoaded, token]);

  // if (!appLoaded)
  //   return <LoadingComponent content="Loading Home Country Plate..." />;
  return (
    <>
      <ToastContainer position="bottom-right" />
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
                <Route
                  key={location.key}
                  path={["/createDish", "/manage/:id"]}
                  component={ProductForm}
                />
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
