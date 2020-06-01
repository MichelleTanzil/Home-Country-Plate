import React from "react";
import { HomePage } from "../../features/home/HomePage";
import { Navbar } from '../../features/navbar/Navbar';
import { Route, Switch, RouteComponentProps, withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { ProductList } from "../../features/products/dashboard/ProductList";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <Navbar />
      <Route exact path="/" component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <>
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </Container>
        </>
      )} />
    </>
  );
}

export default withRouter(App);

