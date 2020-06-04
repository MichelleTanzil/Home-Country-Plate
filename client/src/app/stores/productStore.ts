import { observable, action, runInAction, computed } from "mobx";
import { createContext } from "react";
import { IProduct } from "../models/product";
import agent from "../api/agent";

class ProductStore {
  @observable productRegistry = new Map();
  @observable products: IProduct[] = [];
  @observable product: IProduct | null = null;
  @observable loadingInitial = false;

  @computed get productsByCategories() {
    return this.groupProductsByCategory(
      Array.from(this.productRegistry.values())
    );
  }

  groupProductsByCategory(products: IProduct[]) {
    // sorts all products and reduces them into categories
    const productsSorted = products.sort((a, b) => {
      return a.category.localeCompare(b.category);
    });
    return Object.entries(
      productsSorted.reduce((products, product) => {
        const category = product.category;
        products[category] = products[category]
          ? [...products[category], product]
          : [product];
        return products;
      }, {} as { [key: string]: IProduct[] })
    );
  }

  @action loadProducts = async () => {
    try {
      this.loadingInitial = true;
      const products = await agent.Products.list();
      runInAction("loading products", () => {
        products.forEach((product) => {
          this.productRegistry.set(product.id, product);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load activities error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };
}

export default createContext(new ProductStore()); // this will allow the store to be accessible between components
