import { observable, action, reaction } from "mobx";
import { createContext } from "react";

class CommonStore {
  // TODO: Uncomment for jwt token
  // constructor(rootStore: RootStore) {
  //   this.rootStore = rootStore;

  //   reaction(
  //     () => this.token,
  //     (token) => {
  //       if (token) {
  //         window.localStorage.setItem("jwt", token);
  //       } else {
  //         window.localStorage.removeItem("jwt");
  //       }
  //     }
  //   );
  // }

  // @observable token: string | null = window.localStorage.getItem("jwt");

  // @action setToken = (token: string | null) => {
  //   window.localStorage.setItem("jwt", token!);
  //   this.token = token;
  // };

  @observable appLoaded = false;
  @action setAppLoaded = () => {
    this.appLoaded = true;
  };
}

export default createContext(new CommonStore());
