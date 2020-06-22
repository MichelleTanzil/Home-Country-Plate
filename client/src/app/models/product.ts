export interface IProduct {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  city: string;
  state: string;
  price: number | null;
  isLiked: boolean;
  isChef: boolean;
  likes: ILiker[];
}

export class ProductFormValues implements Partial<IProduct> {
  id: string = "";
  title: string = "";
  image: string = "";
  description: string = "";
  category: string = "";
  city: string = "";
  state: string = "";
  price: number | null = null;
}

export interface ILiker {
  username: string;
  displayName: string;
  image: string;
  isChef: boolean;
}
