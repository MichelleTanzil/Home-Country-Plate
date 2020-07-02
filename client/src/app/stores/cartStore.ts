import { observable, action, runInAction } from "mobx";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { ICartItem, ICart } from "../models/cart";
import ProductStore from "./productStore";
import { IProduct } from "../models/product";

export default class CartStore {
  rootStore: RootStore;
  productStore: ProductStore;
  constructor(rootStore: RootStore, productStore: ProductStore) {
    this.rootStore = rootStore;
    this.productStore = productStore;
  }
  @observable cart: ICart | null = null;
  @observable loadingInitial = false;

  @action loadCart = async () => {
    this.loadingInitial = true;
    try {
      const cart = await agent.Cart.get();
      runInAction(() => {
        this.cart = cart;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action addToCart = async (product: ICartItem) => {
    this.loadingInitial = true;
    try {
      await agent.Cart.addToCart(product);
      runInAction(() => {
        this.cart?.items.push(product);
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
}
