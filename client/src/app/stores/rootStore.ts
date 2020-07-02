import ProductStore from "./productStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import { createContext } from "react";
import { configure } from "mobx";
import CartStore from "./cartStore";

configure({ enforceActions: "always" });

export class RootStore {
  productStore: ProductStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  cartStore: CartStore;

  constructor() {
    this.productStore = new ProductStore(this);
    this.commonStore = new CommonStore(this);
    this.userStore = new UserStore(this);
    this.modalStore = new ModalStore(this);
    this.profileStore = new ProfileStore(this);
    this.cartStore = new CartStore(this, this.productStore);
  }
}

export const RootStoreContext = createContext(new RootStore());
