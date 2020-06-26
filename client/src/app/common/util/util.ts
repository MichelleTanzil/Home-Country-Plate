import { IProduct, ILiker } from "../../models/product";
import { IUser } from "../../models/user";

export const setProductProps = (product: IProduct, user: IUser | null) => {
  if (user !== null) {
    product.isLiked = product.likes.some((a) => a.username === user.username);
    product.isChef = product.likes.some(
      (a) => a.username === user.username && a.isChef
    );
  }
  return product;
};

export const createLike = (user: IUser): ILiker => {
  return {
    displayName: user.displayName,
    isChef: false,
    username: user.username,
    image: user.image!,
  };
};
