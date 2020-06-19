import { Dot } from "pure-react-carousel";
import React from "react";
import { Button, Container } from "semantic-ui-react";

interface IProps {
  slides: number;
}

const DotGroup: React.FC<IProps> = ({ slides }) => (
  <Container textAlign="center">
    <Button.Group size="mini">
      {Array.from(Array(slides).keys()).map((slide) => (
        <Button as={Dot} key={slide} icon="circle" slide={slide} />
      ))}
    </Button.Group>
  </Container>
);

export default DotGroup;
