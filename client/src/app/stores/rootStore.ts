import ProductStore from "./productStore";
import CommonStore from "./commonStore";
import { createContext } from "react";
import { configure } from "mobx";

configure({ enforceActions: "always" });

export class RootStore {
  productStore: ProductStore;
  commonStore: CommonStore;

  constructor() {
    this.productStore = new ProductStore(this);
    this.commonStore = new CommonStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
