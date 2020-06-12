export interface IProduct {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  city: string;
  state: string;
  price: number;
}

export interface IProductFormValues extends Partial<IProduct> {
  cost: string;
}

export class ProductFormValues implements IProductFormValues {
  id: string = "";
  title: string = "";
  image: string = "";
  description: string = "";
  category: string = "";
  city: string = "";
  state: string = "";
  cost: string = "";
  price?: number = undefined;

  constructor(init?: IProductFormValues) {
    if (init && init.price) {
      init.price = parseFloat(init.cost);
    }
    Object.assign(this, init);
  }
}
