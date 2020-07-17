import React from "react";
import { Image } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";

const ProductImageStyle = {
  display: "block",
};

const ProductDetailedImages: React.FC<{ product: IProduct }> = ({
  product,
}) => {
  return (
    <Image
      src={product.image || "/assets/foodPlaceholder.png"}
      wrapped
      size="medium"
      style={ProductImageStyle}
    />
  );
};
export default ProductDetailedImages;
