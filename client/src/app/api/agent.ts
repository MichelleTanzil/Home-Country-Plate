import axios, { AxiosResponse } from "axios";
import { IProduct } from "../models/product";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IProfile, IPhoto } from "../models/profile";
import { ICart } from "../models/cart";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  const { status, data, config } = error.response;
  console.log(JSON.stringify(error, null, "\t")); // printing out the error message nicely
  if (error.message === "Network error" && error.response === undefined) {
    toast.error("Network error");
  }
  if (status === 404) {
    history.push("/notfound"); //this works because in index.tsx App is wrapped in Router, makes it accessible in the agent
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOenProperty("id")
  ) {
    history.push("/notfound");
  }

  if (status === 500) {
    toast.error("Server error - check the terminal for more info");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Products = {
  list: (): Promise<IProduct[]> => requests.get("/products"),
  details: (id: string) => requests.get(`/products/${id}`),
  create: (product: IProduct) => {
    console.log("PRODUCT FROM AGENT.TS", product);
    requests.post("/products", product);
  },
  update: (product: IProduct) =>
    requests.put(`/products/${product.id}`, product),
  delete: (id: string) => requests.delete(`/products/${id}`),
  like: (id: string) => requests.post(`/products/${id}/like`, {}),
  unlike: (id: string) => requests.delete(`/products/${id}/like`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
};

const Profiles = {
  get: (username: string): Promise<IProfile> =>
    requests.get(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> =>
    requests.postForm(`/photos`, photo),
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
};

const Cart = {
  get: (): Promise<ICart> => requests.get("/cart"),
  addToCart: (id: string) => requests.post(`/cart/${id}`, {}),
  remove: (id: string) => requests.post(`/cart/${id}/remove`, {}),
};

export default {
  Products,
  User,
  Profiles,
  Cart,
};
