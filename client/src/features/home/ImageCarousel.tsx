import { CarouselProvider, Slide, Slider, Image } from "pure-react-carousel";
import React from "react";
import { Divider } from "semantic-ui-react";
import DotGroup from "./DotGroup";

const ImageCarousel = () => (
  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={3}
    dragEnabled={false}
  >
    <Slider>
      <Slide index={0}>
        <Image
          hasMasterSpinner={true}
          src={"/assets/carousel/ImageCarouselOne.jpg"}
          alt={"Home page image one"}
          className={"carousel-img"}
        />
      </Slide>
      <Slide index={1}>
        <Image
          hasMasterSpinner={true}
          src={"/assets/carousel/ImageCarouselTwo.jpg"}
          alt={"Home page image two"}
          className={"carousel-img"}
        />
      </Slide>
      <Slide index={2}>
        <Image
          hasMasterSpinner={true}
          src={"/assets/carousel/ImageCarouselThree.jpg"}
          alt={"Home page image three"}
          className={"carousel-img"}
        />
      </Slide>
    </Slider>
    <Divider />
    <DotGroup slides={3} />
  </CarouselProvider>
);

export default ImageCarousel;
