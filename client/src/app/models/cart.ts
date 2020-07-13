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
  productId: string;
  title: string;
  image: string | null;
  price: number | null;
  quantity: number;
}
