import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - We've looked everywhere but couldn't find this.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="products" primary>
          Return to Products page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
