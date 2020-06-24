import React from "react";
import { Image } from "semantic-ui-react";

const ProductImageStyle = {
  display: "block",
};

const ProductDetailedImages = () => {
  return (
    <Image
      src={"/assets/foodPlaceholder.png"}
      wrapped
      size="medium"
      style={ProductImageStyle}
    />
  );
};
export default ProductDetailedImages;
