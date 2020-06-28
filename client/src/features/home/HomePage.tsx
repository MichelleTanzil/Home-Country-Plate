import React from "react";
import { Segment, Container, Grid } from "semantic-ui-react";
import ImageCarousel from "./ImageCarousel";

export const HomePage = () => {
  return (
    <Grid>
      <Grid.Column>
        <ImageCarousel />
      </Grid.Column>
    </Grid>
  );
};
