import ProductStore from "./productStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";

configure({ enforceActions: "always" });

export class RootStore {
  productStore: ProductStore;
  commonStore: CommonStore;
  userStore: UserStore;

  constructor() {
    this.productStore = new ProductStore(this);
    this.commonStore = new CommonStore(this);
    this.userStore = new UserStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
