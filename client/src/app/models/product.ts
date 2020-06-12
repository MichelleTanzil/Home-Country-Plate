export interface IProduct {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  city: string;
  state: string;
  price: number | null;
}

export class ProductFormValues implements IProduct {
  id: string = "";
  title: string = "";
  image: string = "";
  description: string = "";
  category: string = "";
  city: string = "";
  state: string = "";
  price: number | null = null;
}
