import { IProduct } from "./product";

export interface ICart {
  id: string;
  cartItems: ICartItem[];
  total: number;
}

export class BasicCart implements ICart{
    id: string = "";
    cartItems: ICartItem[] = [];
    total: number = 0;
}

export interface ICartItem {
  product: IProduct;
  quantitiy: number;
}
