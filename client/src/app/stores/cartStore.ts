import { observable, action, runInAction } from "mobx";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";

export default class CartStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable cartRegistry = new Map();
  @observable loadingInitial = false;

  @action loadCart = async () => {
    this.loadingInitial = true;
    var username = this.rootStore.userStore.user?.username;
    try {
      const cart = await agent.Cart.get(username!);
      runInAction(() => {
        cart.cartItems.forEach((items) => {
          this.cartRegistry.set(items.product.id, items);
        });
      });
      this.loadingInitial = false;
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
}
