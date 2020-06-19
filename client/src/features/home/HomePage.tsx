import React from "react";
import { Segment } from "semantic-ui-react";
import ImageCarousel from "./ImageCarousel";

export const HomePage = () => {
  return (
    <Segment attached="top">
      <ImageCarousel />
    </Segment>
  );
};
