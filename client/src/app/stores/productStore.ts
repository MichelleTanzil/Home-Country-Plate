import { observable, action, runInAction, computed, reaction } from "mobx";
import { SyntheticEvent } from "react";
import { IProduct, ILiker, IPhoto } from "../models/product";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { setProductProps, createLike } from "../common/util/util";

const LIMIT = 2;

export default class ProductStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.productRegistry.clear();
        this.loadProducts();
      }
    );
  }
  @observable productRegistry = new Map();
  @observable product: IProduct | null = null;
  @observable deleteTarget = "";
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable loading = false;
  // Loading indicator for uploading photo from product
  @observable uploadingProductPhoto = false;
  // Loading indicator for setting main photo or deleting from product
  @observable loadingPhoto = false;
  // For paging
  @observable productCount = 0;
  @observable page = 0;
  @observable predicate = new Map();

  @computed get totalPages() {
    return Math.ceil(this.productCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  // @action setPredicate = (predicate: string, value: string | Date) => {
  //   this.predicate.clear();
  //   if (predicate !== "all") {
  //     this.predicate.set(predicate, value);
  //   }
  // };

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

  // Load all dishes from the back end
  @action loadProducts = async () => {
    this.loadingInitial = true;
    try {
      const productsEnvelope = await agent.Products.list(LIMIT, this.page);
      const { products, productCount } = productsEnvelope;
      console.log(`productsEnvelope: ${JSON.stringify(productsEnvelope)}`);
      runInAction("loading products", () => {
        products.forEach((product) => {
          setProductProps(product, this.rootStore.userStore.user);
          this.productRegistry.set(product.id, product);
        });
        this.productCount = productCount;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load products error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  // Load one dish from the back end
  @action loadProduct = async (id: string) => {
    let product = this.getProduct(id);
    if (product) {
      this.product = product;
      return product;
    } else {
      this.loadingInitial = true;
      try {
        const product = await agent.Products.details(id);
        runInAction("loading product", () => {
          setProductProps(product, this.rootStore.userStore.user);
          this.product = product;
          this.productRegistry.set(product.id, product);
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("load product error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearProduct = () => {
    this.product = null;
  };

  getProduct = (id: string) => {
    return this.productRegistry.get(id);
  };

  @action createProduct = async (product: IProduct) => {
    this.submitting = true;
    const liker = createLike(this.rootStore.userStore.user!);
    liker.isChef = true;
    let likes = [];
    likes.push(liker);
    product.likes = likes;
    try {
      await agent.Products.create(product);
      runInAction("creating product", () => {
        this.productRegistry.set(product.id, product);
        this.submitting = false;
      });
      history.push(`/products/${product.id}`);
    } catch (error) {
      runInAction("create product error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error);
    }
  };

  @action editProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Products.update(product);
      runInAction("editing product", () => {
        this.productRegistry.set(product.id, product);
        this.product = product;
        this.submitting = false;
      });
      history.push(`/products/${product.id}`);
    } catch (error) {
      runInAction("edit product error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteProduct = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.deleteTarget = event.currentTarget.name;
    try {
      await agent.Products.delete(id);
      runInAction("deleting product", () => {
        this.productRegistry.delete(id);
        this.submitting = false;
        this.deleteTarget = "";
      });
    } catch (error) {
      runInAction("delete product error", () => {
        this.submitting = false;
        this.deleteTarget = "";
      });
      console.log(error);
    }
  };

  @action likeProduct = async (id: string) => {
    try {
      let product = this.getProduct(id);
      if (this.rootStore.userStore.user) {
        let liker = createLike(this.rootStore.userStore.user);
        await agent.Products.like(id);
        runInAction(() => {
          product.likes.push(liker);
          product.isLiked = true;
          this.productRegistry.set(id, product);
        });
      } else {
        runInAction(() => {
          toast.error("Please log in or register to unlike this dish.");
        });
      }
    } catch (error) {
      toast.error("Problem with liking this dish");
    }
  };

  @action unlikeProduct = async (id: string) => {
    try {
      let product = this.getProduct(id);
      await agent.Products.unlike(id);
      if (this.rootStore.userStore.user) {
        runInAction(() => {
          product.likes = product.likes.filter(
            (p: ILiker) =>
              p.username !== this.rootStore.userStore.user!.username
          );
          product.isLiked = false;
          this.productRegistry.set(id, product);
        });
      } else {
        runInAction(() => {
          toast.error("Please log in or register to unlike this dish.");
        });
      }
    } catch (error) {
      runInAction(() => {});
      toast.error("Problem with unliking this dish");
    }
  };

  @action uploadPhoto = async (id: string, file: Blob) => {
    this.uploadingProductPhoto = true;
    try {
      let product = this.getProduct(id);
      const photo = await agent.Products.uploadPhoto(file, id);
      runInAction(() => {
        if (product) product.photos.push(photo);
        this.uploadingProductPhoto = false;
      });
    } catch (error) {
      toast.error("Problem uploading the photo for the product");
      console.log(`error: ${error}`);
      runInAction(() => {
        this.uploadingProductPhoto = false;
      });
    }
  };

  @action deletePhoto = async (photoid: string, productid: string) => {
    this.loadingPhoto = true;
    try {
      let product = this.getProduct(productid);
      await agent.Products.deletePhoto(productid, photoid);
      runInAction(() => {
        product.photos = product.photos.filter((p: IPhoto) => p.id !== photoid);
        this.loadingPhoto = false;
      });
    } catch (error) {
      toast.error("Problem deleting the photo for the product");
      runInAction(() => {
        this.loadingPhoto = false;
      });
    }
  };

  @action setMainPhoto = async (photoid: string, productid: string) => {
    this.loadingPhoto = true;
    try {
      let product = this.getProduct(productid);
      await agent.Products.setMainPhoto(productid, photoid);
      runInAction(() => {
        product.photos.find((p: IPhoto) => p.isMain).isMain = false;
        product.photos.find((p: IPhoto) => p.id === photoid).isMain = true;
        this.loadingPhoto = false;
      });
    } catch (error) {
      toast.error("Problem setting photo as main for the product");
      runInAction(() => {
        this.loadingPhoto = false;
      });
    }
  };
}
