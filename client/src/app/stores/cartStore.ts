import { observable, action, runInAction } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { ICartItem, ICart } from "../models/cart";
import ProductStore from "./productStore";
import { IProduct } from "../models/product";
import { toast } from "react-toastify";
import { history } from "../..";

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
      console.log(JSON.stringify(cart));
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

  @action addToCart = async (id: string) => {
    this.loadingInitial = true;
    var exists = this.cart?.items.find((a) => a.productId === id);
    if (exists !== null) {
      toast.warn("Product is already in cart");
      history.push("/products");
    }
    try {
      await agent.Cart.addToCart(id);
      var product: IProduct = this.productStore.getProduct(id);
      runInAction(() => {
        var cartItem: ICartItem = {
          image: product.image,
          price: product.price,
          productId: id,
          quantity: 1,
          title: product.title,
        };

        this.cart?.items.push(cartItem);
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
