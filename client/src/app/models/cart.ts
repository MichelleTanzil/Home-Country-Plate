export interface ICart {
  id: string;
  items: ICartItem[];
  total: number;
}

export class BasicCart implements ICart {
  id: string = "";
  items: ICartItem[] = [];
  total: number = 0;
}

export interface ICartItem {
  id: number;
  productId: string;
  title: string;
  image: string;
  price: number | null;
  quantity: number;
}
